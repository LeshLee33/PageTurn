from pydantic import BaseModel


class User(BaseModel):
    id: str
    nickname: str
    password: str
    bookmarks: list[int]
    books_own: list[int]
