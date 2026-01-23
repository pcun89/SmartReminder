from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
from models import Task
from database import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/tasks")
def get_tasks():
    db = SessionLocal()
    return db.query(Task).all()

@app.post("/tasks")
def create_task(task: dict):
    db = SessionLocal()
    new_task = Task(**task)
    db.add(new_task)
    db.commit()
    return new_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    db = SessionLocal()
    task = db.query(Task).get(task_id)
    db.delete(task)
    db.commit()