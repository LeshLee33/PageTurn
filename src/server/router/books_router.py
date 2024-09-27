from pymongo.errors import CollectionInvalid

from .models import Book
from .database_connection import books_collection
from fastapi import APIRouter, HTTPException

books_router = APIRouter()


@books_router.post("/books/add")
def add_book(title: str, author: str, tags: list[str], release_date: str, description: str):
    new_book = dict(title=title, author=author, tags=tags, release_date=release_date, description=description)

    try:
        book = books_collection.insert_one(new_book)
    except CollectionInvalid:
        raise HTTPException(status_code=400, detail="Collection not found")


@books_router.get("/books/{nickname}")
def get_books_by_user(nickname: str):
    pass


@books_router.get("/books/{tags}")
def get_books_by_tags(tags: list[str]):
    pass


@books_router.delete("/books/delete/{id}")
def delete_book():
    pass


@books_router.patch("/books/edit/{id}")
def edit_book():
    pass


@books_router.put("/books/update/{id}")
def update_book():
    pass
