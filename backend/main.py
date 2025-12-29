from fastapi import FastAPI
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/tasks")
def get_tasks():
    db: Session = SessionLocal()
    tasks = db.query(models.Task).all()
    db.close()
    return tasks


@app.post("/tasks")
def create_task(task: schemas.TaskCreate):
    db: Session = SessionLocal()
    new_task = models.Task(
        title=task.title,
        date=task.date,
        priority=task.priority
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    db.close()
    return new_task