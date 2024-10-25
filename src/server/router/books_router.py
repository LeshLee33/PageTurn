import os

from pymongo.errors import CollectionInvalid

from .models import Book
from .database_connection import books_collection
from fastapi.responses import FileResponse as fr
from fastapi import APIRouter, HTTPException, UploadFile, Query

books_router = APIRouter()
directory = "C:/Users/Lenovo/Desktop/Term5Programming/PageTurn/books/"


def save_book(upload_file, author) -> str:
    if not os.path.isdir(directory):
        os.mkdir(directory + f"{author}")

    file_location = directory + f"{author}/{upload_file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(upload_file.file.read())

    return file_location


@books_router.post("/books/upload/")
def upload_book(title: str, author: str, release_date: str, description: str, upload_file: UploadFile, tags: list[str] = Query()):
    file_location = save_book(upload_file, author)

    new_book = dict(id='', title=title, author=author, tags=[x for x in tags], release_date=release_date,
                    description=description, document_path=file_location, saving_count=0)

    new_book = books_collection.insert_one(new_book)
    current_book = books_collection.find_one(new_book.inserted_id)

    books_collection.update_one(current_book, {"$set": dict(id=str(new_book.inserted_id))})
    current_book = books_collection.find_one(new_book.inserted_id)

    result = Book(id=str(current_book["id"]), title=current_book["title"], author=current_book["author"],
                  tags=current_book["tags"], release_date=current_book["release_date"],
                  description=current_book["description"], saving_count=current_book["saving_count"])

    return result


@books_router.get("/books/get_info")
def get_book_info_by_id(book_id: str):
    current_book = books_collection.find_one(dict(id=book_id))

    result = Book(id=str(current_book["_id"]), title=current_book["title"], author=current_book["author"],
                  tags=current_book["tags"], release_date=current_book["release_date"],
                  description=current_book["description"], saving_count=current_book["saving_count"])

    return result


@books_router.get("/books/get_doc")
def get_book_document_by_id(book_id: str):
    current_book = books_collection.find_one(dict(id=book_id))

    return fr(path=current_book["document_path"], filename=f"{current_book['author']}_{current_book['title']}.docx")


@books_router.get("/books/{author}")
def get_books_by_author(author: str):
    pass


@books_router.get("/books")
def get_books_by_tags(tags: list[str]):
    pass


@books_router.delete("/books/{id}/delete")
def delete_book(book_id: str):
    pass


@books_router.patch("/books/{id}/edit")
def edit_book(book_id: str, title: str, author: str, tags: list[str], release_date: str, description: str):
    pass


@books_router.put("/books/{id}/update")
def update_book(book_id: str, upload_file: UploadFile):
    pass
