import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import "./styles.css";
const API_BASE = "https://smartreminder-fe46.onrender.com";

function App() {
  // --------------------
  // STATE
  // --------------------
  const [taskText, setTaskText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("low");
  const [tasks, setTasks] = useState([]);

  // --------------------
  // REQUEST NOTIFICATION PERMISSION
  // --------------------
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // --------------------
  // LOAD TASKS FROM BACKEND
  // --------------------
  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        data.forEach(scheduleNotification);
      })
      .catch(() => {
        // fallback to local storage if backend is down
        const stored = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTasks(stored);
        stored.forEach(scheduleNotification);
      });
  }, []);

  // --------------------
  // SCHEDULE NOTIFICATION
  // --------------------
  const scheduleNotification = (task) => {
    if (Notification.permission !== "granted") return;

    const notifyAt = new Date(`${task.date}T${task.time}`);
    const delay = notifyAt.getTime() - Date.now();

    if (delay <= 0) return;

    setTimeout(() => {
      new Notification("⏰ SmartReminder", {
        body: `${task.text} (${task.priority.toUpperCase()})`,
      });
    }, delay);
  };

  // --------------------
  // ADD TASK
  // --------------------
  const addTask = async () => {
    if (!taskText || !date || !time) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      date,
      time,
      priority,
    };

    // Backend
    try {
      await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
    } catch { }

    // State
    setTasks((prev) => [...prev, newTask]);

    // Local storage
    const stored = JSON.parse(localStorage.getItem("tasks") || "[]");
    localStorage.setItem("tasks", JSON.stringify([...stored, newTask]));

    // Notification
    scheduleNotification(newTask);

    // Reset form
    setTaskText("");
    setDate("");
    setTime("");
    setPriority("low");
  };

  // --------------------
  // DELETE TASK
  // --------------------
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "DELETE",
      });
    } catch { }

    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  // --------------------
  // EDIT TASK
  // --------------------
  const editTask = async (task) => {
    const newText = prompt("Edit task name:", task.text);
    if (!newText) return;

    const updatedTask = { ...task, text: newText };

    try {
      await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
    } catch { }

    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? updatedTask : t
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // --------------------
  // UI
  // --------------------
  return (
    <div className="app-container">
      <h1>SmartReminder</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Task name"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
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
            <div>
              {task.date} at {task.time}
            </div>

            <div className="task-actions">
              <button onClick={() => editTask(task)}>✏️ Edit</button>
              <button onClick={() => deleteTask(task.id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar View */}
      <Calendar tasks={tasks} />
    </div>
  );
}

export default App;

