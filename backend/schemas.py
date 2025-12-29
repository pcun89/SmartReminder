from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    date: str
    priority: str


class TaskResponse(TaskCreate):
    id: int