import pymongo as pm

client = pm.MongoClient('mongodb://localhost:27017/')
database = client.PageTurn

books_collections = database.Books
