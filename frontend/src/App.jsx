import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import "./styles.css";

const API_BASE = import.meta.env.VITE_API_BASE;

function App() {
  const [taskText, setTaskText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("low");
  const [tasks, setTasks] = useState([]);

  // ---------------------------------
  // REQUEST NOTIFICATION PERMISSION
  // ---------------------------------
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // ---------------------------------
  // LOAD TASKS
  // ---------------------------------
  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then(async (res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(setTasks)
      .catch((err) => console.error(err));
  }, []);

  // ---------------------------------
  // CHECK REMINDERS EVERY 30 SECONDS
  // ---------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      tasks.forEach((task) => {
        if (task.notified) return;

        const notifyAt = new Date(`${task.date}T${task.time}:00`).getTime();


        if (notifyAt <= now) {
          fireNotification(task);
        }
      });
    }, 5000); // 5s

    return () => clearInterval(interval);
  }, [tasks]);

  // ---------------------------------
  // FIRE NOTIFICATION + AUTO DELETE
  // ---------------------------------
  const fireNotification = async (task) => {
    if (Notification.permission !== "granted") return;

    new Notification("⏰ SmartReminder", {
      body: `${task.text} (${task.priority.toUpperCase()})`,
    });

    task.notified = true;

    try {
      await fetch(`${API_BASE}/tasks/${task.id}/notified`, {
        method: "PUT",
      });
    } catch { }

    deleteTask(task.id);
  };


  // ---------------------------------
  // ADD TASK
  // ---------------------------------
  const addTask = async () => {
    if (!taskText || !date || !time) return;

    const newTask = {
      text: taskText,
      date,
      time,
      priority,
      notified: false,
    };

    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const saved = await res.json();
      setTasks((prev) => [...prev, saved]);
    } catch (err) {
      console.error(err);
    }

    setTaskText("");
    setDate("");
    setTime("");
    setPriority("low");
  };

  // ---------------------------------
  // DELETE TASK
  // ---------------------------------
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    } catch { }

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ---------------------------------
  // FULL EDIT (name/date/time/priority)
  // ---------------------------------
  const editTask = async (task) => {
    const text = prompt("Task name:", task.text);
    const date = prompt("Date (YYYY-MM-DD):", task.date);
    const time = prompt("Time (HH:MM):", task.time);
    const priority = prompt("Priority (low/medium/high):", task.priority);

    if (!text || !date || !time || !priority) return;

    const updated = { ...task, text, date, time, priority };

    try {
      await fetch(`${API_BASE}/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch { }

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updated : t))
    );
  };

  // ---------------------------------
  // UI
  // ---------------------------------
  return (
    <div className="page">
      <div className="app-container">
        <h1>SmartReminder</h1>

        <div className="form">
          <input
            placeholder="Task name"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button onClick={addTask}>Add Reminder</button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task ${task.priority}`}>
              <strong>{task.text}</strong>
              <div>{task.date} at {task.time}</div>

              <div className="task-actions">
                <button onClick={() => editTask(task)}>✏️ Edit</button>
                <button onClick={() => deleteTask(task.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>

        <Calendar tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
