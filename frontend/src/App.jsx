import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [taskText, setTaskText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("low");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const scheduleNotification = (task) => {
    if (Notification.permission !== "granted") return;

    const targetTime = new Date(`${task.date}T${task.time}`);
    const delay = targetTime.getTime() - Date.now();

    if (delay <= 0) return;

    setTimeout(() => {
      new Notification("⏰ SmartReminder", {
        body: task.text,
      });
    }, delay);
  };

  const addTask = () => {
    if (!taskText || !date || !time) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      date,
      time,
      priority,
    };

    setTasks([...tasks, newTask]);
    scheduleNotification(newTask);

    setTaskText("");
    setDate("");
    setTime("");
    setPriority("low");
  };

  return (
    <div className="app-container">
      <h1>SmartReminder</h1>

      <input
        type="text"
        placeholder="Task"
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

      {tasks.map((task) => (
        <div key={task.id} className={`task ${task.priority}`}>
          <div>
            <strong>{task.text}</strong>
            <div>
              {task.date} at {task.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
