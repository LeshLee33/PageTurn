import os

from pymongo.errors import CollectionInvalid

from .models import Book
from .database_connection import books_collection, users_collection, tokens_collection
from fastapi.responses import FileResponse
from fastapi import APIRouter, HTTPException, UploadFile, Query

books_router = APIRouter()
directory = "C:/Users/Lenovo/Desktop/Term5Programming/PageTurn/"


def save_book(upload_file, author) -> str:
    if not os.path.isdir(directory):
        os.mkdir(directory + f"/books/{author}")

    file_location = directory + f"/books/{author}/{upload_file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(upload_file.file.read())

    return file_location


@books_router.post("/books/upload/")
def upload_book(token: str, title: str, author: str, release_date: str, description: str, upload_file: UploadFile, tags: list[str] = Query()):
    current_token = tokens_collection.find_one(dict(token=token))
    if current_token is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may not be signed in")

    file_location = save_book(upload_file, author)

    new_book = dict(id='', title=title, author=author, tags=tags, release_date=release_date,
                    description=description, document_path=file_location, saving_count=0)
    book_id = books_collection.insert_one(new_book)

    books_collection.update_one(new_book, {"$set": dict(id=str(book_id.inserted_id))})
    current_book = books_collection.find_one(book_id.inserted_id)

    result = Book(id=current_book["id"], title=current_book["title"], author=current_book["author"],
                  tags=current_book["tags"], release_date=current_book["release_date"],
                  description=current_book["description"], saving_count=current_book["saving_count"])

    return result


@books_router.get("/books/get_info")
def get_book_info_by_id(book_id: str):
    current_book = books_collection.find_one(dict(id=book_id))

    result = Book(id=current_book["id"], title=current_book["title"], author=current_book["author"],
                  tags=current_book["tags"], release_date=current_book["release_date"],
                  description=current_book["description"], saving_count=current_book["saving_count"])

    return result


@books_router.get("/books/get_doc")
def get_book_document_by_id(book_id: str):
    current_book = books_collection.find_one(dict(id=book_id))

    return FileResponse(path=current_book["document_path"], filename=f"{current_book['author']}_{current_book['title']}.docx")


@books_router.get("/books/get_by_author")
def get_books_by_author(author: str):
    books_list = users_collection.find(nickname=author)['books_own']
    result: list[Book] = []

    for book_id in books_list:
        book = books_collection.find_one(id=book_id)
        if book:
            book_response = Book(id=book["id"], title=book["title"], author=book["author"], tags=book["tags"],
                                 release_date=book["release_date"], description=book["description"], saving_count=book["saving_count"])
            result.append(book_response)

    return result


@books_router.get("/books/get_by_tags")
def get_books_by_tags(tags: list[str] = Query()):
    query = dict(tags=(tags[0]))

    books_list = list(books_collection.find(query))
    if books_list:
        for tag in tags[1::1]:
            for book in books_list:
                if tag not in book['tags']:
                    books_list.remove(book)

    result: list[Book] = []
    for book in books_list:
        book_response = Book(id=book["id"], title=book["title"], author=book["author"], tags=book["tags"],
                             release_date=book["release_date"], description=book["description"], saving_count=book["saving_count"])
        result.append(book_response)

    return result


@books_router.delete("/books/delete")
def delete_book(book_id: str):
    query = dict(id=book_id)
    current_book = books_collection.find_one(query)

    os.remove(current_book['document_path'])

    books_collection.delete_one(current_book)

    return dict(status_code=200, detail="Book deleted successfully")


@books_router.patch("/books/edit")
def edit_book(token: str, book_id: str, title: str, author: str, tags: list[str], release_date: str, description: str):
    current_token = tokens_collection.find_one(dict(token=token))
    if current_token is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may not be signed in")

    new_data = dict(id='', title=title, author=author, tags=tags, release_date=release_date,
                    description=description, saving_count=0)
    current_book = books_collection.find_one(dict(id=book_id))

    books_collection.update_one(current_book, {"$set": new_data})
    current_book = books_collection.find_one(dict(id=book_id))

    result = Book(id=current_book["id"], title=current_book["title"], author=current_book["author"],
                  tags=current_book["tags"], release_date=current_book["release_date"],
                  description=current_book["description"], saving_count=current_book["saving_count"])

    return result


@books_router.put("/books/update")
def update_book(token: str, book_id: str, upload_file: UploadFile):
    current_token = tokens_collection.find_one(dict(token=token))
    if current_token is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may not be signed in")

    current_book = books_collection.find_one(dict(id=book_id))
    file_location = save_book(upload_file, current_book['nickname'])

    new_data = dict(document_path=file_location)
    books_collection.update_one(current_book, {"$set": new_data})
    current_book = books_collection.find_one(dict(id=book_id))

    result = Book(id=current_book["id"], title=current_book["title"], author=current_book["author"],
                  tags=current_book["tags"], release_date=current_book["release_date"],
                  description=current_book["description"], saving_count=current_book["saving_count"])

    return result
