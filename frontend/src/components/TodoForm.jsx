import { useState } from "react";
import { addActivity } from "../api";

export default function TodoForm({ reload }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("urgent");

    const submit = async (e) => {
        e.preventDefault();
        await addActivity({ title, date, priority });
        reload();
        setTitle("");
    };

    return (
        <form onSubmit={submit} className="form">
            <input placeholder="Activity..." value={title}
                onChange={(e) => setTitle(e.target.value)} required />
            <input type="date" onChange={(e) => setDate(e.target.value)} required />
            <select onChange={(e) => setPriority(e.target.value)}>
                <option value="urgent">Urgent</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <button>Add</button>
        </form>
    );
}
