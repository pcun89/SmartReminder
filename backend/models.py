from sqlalchemy import Column, Integer, String, Boolean
from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    date = Column(String)
    time = Column(String)
    priority = Column(String)
    notified = Column(Boolean, default=False)