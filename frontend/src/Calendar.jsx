export default function Calendar({ tasks = [] }) {
    const days = [...new Set(tasks.map(t => t.date))];

    return (
        <div className="calendar">
            <h2>Calendar</h2>
            {days.map((day) => (
                <div key={day} className="calendar-day">
                    <h3>{day}</h3>
                    {tasks
                        .filter(t => t.date === day)
                        .map(t => (
                            <div key={t.id}>
                                ⏰ {t.time} — {t.text}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}
