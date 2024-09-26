from models.book import Book
from fastapi import APIRouter

router = APIRouter()


@router.post("/books/add")
def add_book():
    pass


@router.get("/books")
def get_book():
    pass


@router.delete("/books/delete")
def delete_book():
    pass


@router.patch("/books/edit")
def edit_book():
    pass


@router.put("/books/update")
def update_book():
    pass
