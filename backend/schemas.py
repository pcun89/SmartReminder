from datetime import date
from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    date: date
    priority: str

class Task(TaskCreate):
    id: int

    class Config:
        from_attributes = True