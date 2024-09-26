from pydantic import BaseModel


class Book(BaseModel):
    _id: int
    title: str
    author: str
    tags: list[str]
    release_date: str
    likes_count: int
    dislikes_count: int
    description: str
