import pymongo as pm

client = pm.MongoClient('mongodb://mongo:27017/')
database = client.PageTurn

books_collection = database.Books
users_collection = database.Users
tokens_collection = database.Tokens
