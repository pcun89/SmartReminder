import { useEffect, useState } from "react";
import { fetchActivities, addActivity } from "./api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./styles.css";

export default function App() {
    const [activities, setActivities] = useState([]);

    const load = async () => {
        const data = await fetchActivities();
        setActivities(data);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="container">
            <h1>ReminderFlow</h1>
            <TodoForm reload={load} />
            <TodoList activities={activities} />
        </div>
    );
}
