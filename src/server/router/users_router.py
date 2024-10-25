from .database_connection import users_collection, tokens_collection
from fastapi import HTTPException
from fastapi import APIRouter
import secrets as sc

users_router = APIRouter()


@users_router.get("/users/check_token", response_model=dict)
async def check_user_token(token: str):
    query = dict(token=token)

    user = users_collection.find_one(query)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may be not signed in")

    return dict(status_code=200, detail="User is signed in")


@users_router.post("/sign_up", response_model=str)
async def sign_up(nickname: str, password: str):
    token = sc.token_hex(8)
    new_user = dict(nickname=nickname, password=password, bookmarks=[], books_own=[])
    new_token = dict(nickname=nickname, token=token)

    user = users_collection.find_one({"nickname": nickname})
    if user:
        raise HTTPException(status_code=400, detail="Nickname already registered")
    users_collection.insert_one(new_user)
    tokens_collection.insert_one(new_token)

    return token


@users_router.get("/sign_in", response_model=str)
async def sign_in(nickname: str, password: str):
    token = sc.token_hex(8)
    query = dict(nickname=nickname)
    new_token = dict(nickname=nickname, token=token)

    user = users_collection.find_one(query)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid username")

    if user["password"] != password:
        raise HTTPException(status_code=400, detail="Invalid password")

    if tokens_collection.find_one(dict(nickname=nickname)) is None:
        tokens_collection.insert_one(new_token)

    current_token = tokens_collection.find_one(dict(nickname=nickname))

    return current_token['token']


@users_router.get("/sign_out", response_model=dict)
async def sign_out(token):
    query = dict(token=token)

    current_token = tokens_collection.find_one(query)
    if current_token is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may be not signed in")

    tokens_collection.delete_one(query)

    return dict(status_code=200, detail="Signed out, token nullified")


@users_router.patch("/users/{nickname}/change_password", response_model=dict)
async def change_password(token: str, nickname: str, old_password: str, new_password: str, new_password_repeat: str):
    current_user = dict(nickname=nickname)

    if new_password != new_password_repeat:
        raise HTTPException(status_code=400, detail="New password labels do not match")
    new_data = {"$set": dict(password=new_password)}

    current_token = tokens_collection.find_one(dict(token=token))
    if current_token is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may not be signed in")

    user = users_collection.find_one(current_user)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid username")

    if user["password"] != old_password:
        raise HTTPException(status_code=400, detail="Invalid password")
    else:
        users_collection.update_one(current_user, new_data)

    return dict(status_code=200, detail="Password changed successfully")


@users_router.get("/users/{nickname}/collection")
def get_collection_by_nickname(token: str, nickname: str) -> list[str]:
    current_token = tokens_collection.find_one(dict(token=token))
    if current_token is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may not be signed in")

    user = users_collection.find_one(dict(nickname=nickname))
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid username")

    return user["bookmarks"]
