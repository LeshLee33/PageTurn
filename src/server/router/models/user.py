from pydantic import BaseModel


class User(BaseModel):
    id: str
    nickname: str
    password: str
    books_collection: list[int]
    books_own: list[int]
