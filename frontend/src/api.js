const API_URL = "http://localhost:8000";

export async function fetchActivities() {
    const res = await fetch(`${API_URL}/activities`);
    return res.json();
}

export async function addActivity(activity) {
    await fetch(`${API_URL}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
    });
}