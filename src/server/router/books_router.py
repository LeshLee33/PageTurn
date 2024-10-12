from pymongo.errors import CollectionInvalid

from .models import Book
from .database_connection import books_collection
from fastapi import APIRouter, HTTPException, UploadFile

books_router = APIRouter()


@books_router.post("/books/upload")
def add_book(title: str, author: str, tags: list[str], release_date: str, description: str, upload_file: UploadFile) -> Book:
    content = upload_file.file.read()
    new_book = dict(title=title, author=author, tags=tags, release_date=release_date, description=description, text=content, saving_count=0)

    try:
        new_book = books_collection.insert_one(new_book)
        current_book = books_collection.find_one(new_book.inserted_id)
    except CollectionInvalid:
        raise HTTPException(status_code=400, detail="Collection not found")

    result = Book(id=str(current_book["_id"]),
                  title=current_book["title"],
                  author=current_book["author"],
                  tags=current_book["tags"],
                  release_date=current_book["release_date"],
                  description=current_book["description"],
                  text=current_book["text"],
                  saving_count=current_book["saving_count"])

    return result


@books_router.get("/books/{id}")
def get_book_by_id(book_id: str) -> Book:
    query = dict(_id=book_id)

    try:
        current_book = books_collection.find_one(query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    result = Book(id=str(current_book["_id"]),
                  title=current_book["title"],
                  author=current_book["author"],
                  tags=current_book["tags"],
                  release_date=current_book["release_date"],
                  description=current_book["description"],
                  text=current_book["text"],
                  saving_count=current_book["saving_count"])

    return result


@books_router.get("/books/{nickname}")
def get_books_by_user(username: str) -> Book:
    query = dict(nickname=username)

    try:
        current_book = books_collection.find_one(query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    result = Book(id=str(current_book["_id"]),
                  title=current_book["title"],
                  author=current_book["author"],
                  tags=current_book["tags"],
                  release_date=current_book["release_date"],
                  description=current_book["description"],
                  text=current_book["text"],
                  saving_count=current_book["saving_count"])

    return result


@books_router.get("/books/{tags_list}")
def get_books_by_tags(tags: list[str]):
    pass


@books_router.delete("/books/{id}/delete")
def delete_book(book_id: str):
    query = dict(_id=book_id)

    try:
        books_collection.delete_one(query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    return dict(status_code=200, message="Book deletion successful")


@books_router.patch("/books/{id}/edit")
def edit_book(book_id: str, title: str, author: str, tags: list[str], release_date: str, description: str) -> Book:
    new_data = {"$set": dict(title=title, author=author, tags=tags, release_date=release_date, description=description)}

    try:
        current_book = books_collection.find_one(dict(_id=book_id))
        books_collection.update_one(current_book, new_data)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    current_book = books_collection.find_one(dict(_id=book_id))
    result = Book(id=current_book["_id"],
                  title=current_book["title"],
                  author=current_book["author"],
                  tags=current_book["tags"],
                  release_date=current_book["release_date"],
                  description=current_book["description"],
                  saving_count=current_book["saving_count"])

    return result


@books_router.put("/books/{id}/update")
def update_book(book_id: str, upload_file: UploadFile) -> Book:
    content = upload_file.file.read()
    new_data = {"$set", dict(text=content)}

    try:
        book = books_collection.find_one(dict(_id=book_id))
        updated_book = books_collection.update_one(book, new_data)
    except CollectionInvalid:
        raise HTTPException(status_code=400, detail="Collection not found")

    current_book = books_collection.find_one(dict(_id=book_id))
    result = Book(id=str(current_book["_id"]),
                  title=current_book["title"],
                  author=current_book["author"],
                  tags=current_book["tags"],
                  release_date=current_book["release_date"],
                  description=current_book["description"],
                  text=current_book["text"],
                  saving_count=current_book["saving_count"])

    return result
