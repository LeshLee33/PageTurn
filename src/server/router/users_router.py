from pymongo.errors import *
from .database_connection import users_collection
from .models import User
from fastapi import HTTPException
from fastapi import APIRouter

users_router = APIRouter()


@users_router.get("/users/{nickname}")
async def get_user_by_nickname(nickname: str) -> User:
    query = dict(nickname=nickname)

    try:
        user = users_collection.find_one(query)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection not found")

    result = User(id=str(user['_id']),
                  nickname=user['nickname'],
                  password=user['password'],
                  books_collection=user['books_collection'],
                  books_own=user['books_own'],)

    return result


@users_router.get("/users")
async def get_all_users() -> list[User]:
    result = []
    try:
        users = list(users_collection.find())

        if len(users) == 0:
            raise HTTPException(status_code=404, detail="Users not found")
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection not found")

    for user in users:
        result.append(User(id=str(user['_id']),
                           nickname=user['nickname'],
                           password=user['password'],
                           books_collection=user['books_collection'],
                           books_own=user['books_own'],))
    print(result)

    return result


@users_router.post("/register", response_model=User)
async def register_user(nickname: str, password: str):
    new_user = dict(nickname=nickname, password=password, books_collection=[], books_own=[])

    try:
        user = users_collection.find_one({"nickname": nickname})
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    if user:
        raise HTTPException(status_code=400, detail="Nickname already registered")
    users_collection.insert_one(new_user)
    user = users_collection.find_one({"nickname": nickname})

    result = User(id=str(user['_id']),
                  nickname=user['nickname'],
                  password=user['password'],
                  books_collection=user['books_collection'],
                  books_own=user['books_own'],)

    return result


@users_router.get("/login")
async def login_user(nickname: str, password: str) -> User:
    query = {"nickname": nickname}

    user = users_collection.find_one(query)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid username")

    if user["password"] != password:
        raise HTTPException(status_code=400, detail="Invalid password")

    result = User(id=str(user['_id']),
                  nickname=user['nickname'],
                  password=user['password'],
                  books_collection=user['books_collection'],
                  books_own=user['books_own'],)

    return result


@users_router.patch("/users/{nickname}/change_password", status_code=200)
async def change_password(nickname: str, old_password: str, new_password: str, new_password_repeat: str) -> User:
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

    user = users_collection.find_one(current_user)

    result = User(id=str(user['_id']),
                  nickname=user['nickname'],
                  password=user['password'],
                  books_collection=user['books_collection'],
                  books_own=user['books_own'],)

    return result


@users_router.get("/users/{nickname}/collection")
def get_collection_by_nickname(nickname: str) -> list[str]:
    current_user = dict(nickname=nickname)

    user = users_collection.find_one(current_user)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid username")

    return user["books_collection"]
