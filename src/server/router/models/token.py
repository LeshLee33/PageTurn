from pydantic import BaseModel


class Token(BaseModel):
    id: str
    nickname: str
    token: str
