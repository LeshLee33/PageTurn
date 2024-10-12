from pydantic import BaseModel


class Book(BaseModel):
    id: str
    title: str
    author: str
    tags: list[str]
    release_date: str
    description: str
    text: bytes
    saving_count: int
