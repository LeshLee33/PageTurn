import os
from .models import Book
from .database_connection import books_collection, users_collection, tokens_collection
from fastapi.responses import FileResponse
from fastapi import APIRouter, HTTPException, UploadFile, Query

books_router = APIRouter()


def save_book(upload_file, author) -> str:
    current_directory = os.getcwd()
    os.chdir(current_directory.replace("\\src\\server", ""))
    directory = os.getcwd()
    directory = directory.replace('\\', '/')

    if not os.path.exists(directory + "/books"):
        os.mkdir(directory + "/books")

    if not os.path.exists(directory + "/books" + f"/{author}"):
        os.mkdir(directory + "/books" + f"/{author}")

    file_location = directory + "/books" + f"/{author}/{upload_file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(upload_file.file.read())

    return file_location


@books_router.post("/books/upload/")
def upload_book(token: str, title: str, nickname: str, release_date: str, description: str, upload_file: UploadFile,
                tags: list[str] = Query()):
    current_token = tokens_collection.find_one(dict(token=token))
    if current_token is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may not be signed in")

    current_user = users_collection.find_one(dict(nickname=nickname))
    books_own = current_user['books_own']

    file_location = save_book(upload_file, nickname)

    new_book = dict(id='', title=title, author=nickname, tags=tags, release_date=release_date,
                    description=description, document_path=file_location, saving_count=0)
    current_book = books_collection.insert_one(new_book)
    book_id = str(current_book.inserted_id)

    books_collection.update_one(new_book, {"$set": dict(id=book_id)})
    current_book = books_collection.find_one(dict(id=book_id), dict(_id=0, document_path=0))

    books_own.append(current_book['id'])
    users_collection.update_one(dict(nickname=nickname), {"$set": dict(books_own=books_own)})

    return current_book


@books_router.get("/books/get_info")
def get_book_info_by_id(book_id: str):
    current_book = books_collection.find_one(dict(id=book_id), dict(_id=0, document_path=0))

    return current_book


@books_router.get("/books/get_doc")
def get_book_document_by_id(book_id: str):
    current_book = books_collection.find_one(dict(id=book_id))

    with open(current_book["document_path"], "rb") as file_object:
        file_object.read()

    return FileResponse(path=current_book["document_path"],
                        filename=f"{current_book['author']}_{current_book['title']}.docx")


@books_router.get("/books/get_by_author")
def get_books_by_author(author: str):
    current_author = users_collection.find_one(dict(nickname=author))
    books_list = current_author['books_own']
    result: list[Book] = []

    for book_id in books_list:
        book = books_collection.find_one(dict(id=book_id), dict(_id=0, document_path=0))
        if book is not None:
            result.append(book)

    return result


@books_router.get("/books/get_by_tags")
def get_books_by_tags(tags: list[str] = Query()):
    query = dict(tags=(tags[0]))

    books_list = list(books_collection.find(query, dict(_id=0, document_path=0)))
    if books_list:
        for tag in tags[1::1]:
            for book in books_list:
                if tag not in book['tags']:
                    books_list.remove(book)

    result: list[Book] = []
    for book in books_list:
        result.append(book)

    return result


@books_router.delete("/books/delete")
def delete_book(token: str, book_id: str):
    current_token = tokens_collection.find_one(dict(token=token))
    if current_token is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may not be signed in")

    query = dict(id=book_id)
    current_book = books_collection.find_one(query)

    os.remove(current_book['document_path'])

    books_collection.delete_one(current_book)

    current_user = users_collection.find_one(dict(nickname=current_token['nickname']))
    books_own = current_user['books_own']

    books_own.remove(book_id)
    users_collection.update_one(dict(nickname=current_token['nickname']), {"$set": dict(books_own=books_own)})

    return dict(status_code=200, detail="Book deleted successfully")


@books_router.patch("/books/edit")
def edit_book(token: str, book_id: str, title: str, description: str, tags: list[str] = Query()):
    current_token = tokens_collection.find_one(dict(token=token))
    if current_token is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may not be signed in")

    new_data = dict(title=title, tags=tags, description=description)
    current_book = books_collection.find_one(dict(id=book_id))

    books_collection.update_one(current_book, {"$set": new_data})
    current_book = books_collection.find_one(dict(id=book_id), dict(_id=0, document_path=0))

    return current_book


@books_router.put("/books/update")
def update_book(token: str, book_id: str, upload_file: UploadFile):
    current_token = tokens_collection.find_one(dict(token=token))
    if current_token is None:
        raise HTTPException(status_code=404, detail="Invalid token: user may not be signed in")

    current_book = books_collection.find_one(dict(id=book_id))
    os.remove(current_book['document_path'])
    file_location = save_book(upload_file, current_book['author'])

    new_data = dict(document_path=file_location)
    books_collection.update_one(current_book, {"$set": new_data})
    current_book = books_collection.find_one(dict(id=book_id), dict(_id=0, document_path=0))

    return current_book


@books_router.patch("/books/add_to_bookmarks")
def add_book_to_bookmarks(nickname: str, book_id: str):
    book_query = dict(id=book_id)
    user_query = []
