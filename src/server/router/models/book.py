from pydantic import BaseModel


class Book(BaseModel):
    id: str
    title: str
    author: str
    tags: list
    release_date: str
    description: str
    saving_count: int
