export default function TodoList({ activities }) {
    return (
        <div className="list">
            {activities.map((a) => (
                <div key={a.id} className={`card ${a.priority}`}>
                    <h3>{a.title}</h3>
                    <p>{a.date}</p>
                </div>
            ))}
        </div>
    );
}
