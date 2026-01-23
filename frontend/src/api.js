const API = "http://localhost:8000";

export const getTasks = () => fetch(`${API}/tasks`).then(r => r.json());

export const addTask = (task) =>
    fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });

export const deleteTask = (id) =>
    fetch(`${API}/tasks/${id}`, { method: "DELETE" });
