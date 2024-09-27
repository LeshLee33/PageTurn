from pydantic import BaseModel


class User(BaseModel):
    _id: int
    nickname: str
    password: str
    books_collection: list[int]
    books_own: list[int]
    likes: list[int]
