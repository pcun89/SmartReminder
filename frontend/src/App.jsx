import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import EditModal from "./EditModal";
import "./styles.css";

const API_BASE = import.meta.env.VITE_API_BASE;

function App() {
  const [taskText, setTaskText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("low");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // --------------------
  // Notification permission
  // --------------------
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // --------------------
  // Load tasks
  // --------------------
  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        setTasks(data);
        data.forEach(scheduleNotification);
      })
      .catch(err => console.error(err));
  }, []);

  // --------------------
  // Notification logic
  // --------------------
  const scheduleNotification = (task) => {
    if (Notification.permission !== "granted") return;
    if (task.notified) return;

    const notifyAt = new Date(`${task.date}T${task.time}`);
    const delay = notifyAt.getTime() - Date.now();
    if (delay <= 0) return;

    setTimeout(async () => {
      new Notification("⏰ SmartReminder", {
        body: `${task.text} (${task.priority.toUpperCase()})`,
      });

      // Auto-delete after notify
      await deleteTask(task.id, false);
    }, delay);
  };

  // --------------------
  // Add task
  // --------------------
  const addTask = async () => {
    if (!taskText || !date || !time) return;

    const newTask = { text: taskText, date, time, priority };

    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const saved = await res.json();
    setTasks(prev => [...prev, saved]);
    scheduleNotification(saved);

    setTaskText("");
    setDate("");
    setTime("");
    setPriority("low");
  };

  // --------------------
  // Delete task
  // --------------------
  const deleteTask = async (id, notifyBackend = true) => {
    if (notifyBackend) {
      await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    }
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // --------------------
  // Save edited task
  // --------------------
  const saveEdit = async (updated) => {
    await fetch(`${API_BASE}/tasks/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    setTasks(prev =>
      prev.map(t => (t.id === updated.id ? updated : t))
    );

    scheduleNotification(updated);
    setEditingTask(null);
  };

  // --------------------
  // UI
  // --------------------
  return (
    <div className="page">
      <div className="app-container">
        <h1>SmartReminder</h1>

        <div className="form">
          <input
            placeholder="Task name"
            value={taskText}
            onChange={e => setTaskText(e.target.value)}
          />
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />

          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button onClick={addTask}>Add Reminder</button>
        </div>

        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task ${task.priority}`}>
              <strong>{task.text}</strong>
              <div>{task.date} at {task.time}</div>

              <div className="task-actions">
                <button onClick={() => setEditingTask(task)}>✏️ Edit</button>
                <button onClick={() => deleteTask(task.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>

        <Calendar tasks={tasks} />
      </div>

      {editingTask && (
        <EditModal
          task={editingTask}
          onSave={saveEdit}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;

