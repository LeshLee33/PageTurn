from pydantic import BaseModel


class Book(BaseModel):
    id: int
    title: str
    author: str
    tags: list[str]
    release_date: str
    description: str
    saving_count: int
