from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tasks = []


@app.get("/")
def root():
    return {
        "message": "SmartReminder API is running",
        "docs": "/docs"
    }


@app.get("/tasks")
def get_tasks():
    return tasks


@app.post("/tasks")
def add_task(task: dict):
    tasks.append(task)
    return task


@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated_task: dict):
    for i, task in enumerate(tasks):
        if task["id"] == task_id:
            tasks[i] = updated_task
            return updated_task
    return {"error": "Task not found"}


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return {"status": "deleted"}
