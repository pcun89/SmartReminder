import { useState } from "react";

function EditModal({ task, onSave, onClose }) {
    const [form, setForm] = useState(task);

    const update = (key, value) =>
        setForm(prev => ({ ...prev, [key]: value }));

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Reminder</h2>

                <input value={form.text} onChange={e => update("text", e.target.value)} />
                <input type="date" value={form.date} onChange={e => update("date", e.target.value)} />
                <input type="time" value={form.time} onChange={e => update("time", e.target.value)} />

                <select value={form.priority} onChange={e => update("priority", e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <div className="modal-actions">
                    <button onClick={() => onSave(form)}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
