from pymongo.errors import *
from .database_connection import users_collection
from .models import User
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
    new_user = dict(nickname=nickname, password=password, bookmarks=[], books_own=[], token=token)

    user = users_collection.find_one({"nickname": nickname})
    if user:
        raise HTTPException(status_code=400, detail="Nickname already registered")
    users_collection.insert_one(new_user)

    return token


@users_router.get("/sign_in", response_model=str)
async def sign_in(nickname: str, password: str):
    token = sc.token_hex(8)
    query = dict(nickname=nickname)

    user = users_collection.find_one(query)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid username")

    if user["password"] != password:
        raise HTTPException(status_code=400, detail="Invalid password")

    new_data = {"$set": dict(token=token)}
    users_collection.update_one(user, new_data)

    return token


@users_router.get("/sign_out", response_model=dict)
async def sign_out(token):
    query = dict(token=token)

    user = users_collection.find_one(query)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may be not signed in")

    new_data = {"$set": dict(token='')}
    users_collection.update_one(query, new_data)

    return dict(status_code=200, detail="Signed out, token nullified")


@users_router.patch("/users/{nickname}/change_password", response_model=dict)
async def change_password(nickname: str, old_password: str, new_password: str, new_password_repeat: str):
    current_user = dict(nickname=nickname)

    if new_password != new_password_repeat:
        raise HTTPException(status_code=400, detail="New password labels do not match")
    new_data = {"$set": dict(password=new_password)}

    user = users_collection.find_one(current_user)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid username")

    if not user or user["password"] != old_password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    else:
        users_collection.update_one(current_user, new_data)

    return dict(status_code=200, detail="Password changed successfully")


@users_router.get("/users/{nickname}/collection")
def get_collection_by_nickname(nickname: str) -> list[str]:
    current_user = dict(nickname=nickname)

    user = users_collection.find_one(current_user)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid username")

    return user["bookmarks"]
