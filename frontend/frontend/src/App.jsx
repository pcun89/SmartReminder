import { useEffect, useState } from "react";
import { fetchTasks, createTask } from "./api";
import "./styles.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const submitTask = async () => {
    if (!title || !date) return;

    const newTask = await createTask({
      title,
      date,
      priority
    });

    setTasks([...tasks, newTask]);
    setTitle("");
    setDate("");
    setPriority("low");
  };

  return (
    <div className="container">
      <h1>SmartReminder</h1>

      <div className="form">
        <input
          placeholder="Task name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="urgent">Urgent</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button onClick={submitTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.priority}>
            {task.title} ({task.date})
          </li>
        ))}
      </ul>
    </div>
  );
}




