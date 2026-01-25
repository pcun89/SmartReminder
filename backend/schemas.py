from pydantic import BaseModel


class TaskBase(BaseModel):
    text: str
    date: str
    time: str
    priority: str
    notified: bool = False


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int

    class Config:
        from_attributes = True