from .books_router import books_router
from .users_router import users_router
from .chat import start_websocket_server
from fastapi import APIRouter

base_router = APIRouter()


@base_router.get("/")
def greetings():
    return "Hello on PageTurn: internet library"
