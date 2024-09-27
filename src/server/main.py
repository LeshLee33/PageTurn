from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from router import users_router, books_router, base_router


app = FastAPI(title="PageTurn: internet library")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить все источники
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["*"],  # Разрешить все заголовки
)

app.include_router(users_router)
app.include_router(books_router)
app.include_router(base_router)


def main():
    uvicorn.run(app="main:app", reload=True)


if __name__ == "__main__":
    main()
