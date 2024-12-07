import click
import pymongo as pm

client = pm.MongoClient('mongodb://localhost:27017/')
database = client.PageTurn
users_collection = database.Users


@click.group()
def cli():
    """Управление пользователями."""
    print("Система управления пользователями запущена.")


@cli.command()
@click.argument('nickname')
@click.argument('password')
def create_user(nickname, password):
    """Создание нового пользователя."""
    new_user = dict(nickname=nickname, password=password, bookmarks=[], books_own=[])

    user = users_collection.find_one({"nickname": nickname})
    if user:
        print("Пользователь с таким псевдонимом уже существует")
        return
    users_collection.insert_one(new_user)
    click.echo(f'Пользователь "{nickname}" успешно создан!')


@cli.command()
@click.argument('nickname')
def read_user_info(nickname):
    """Просмотр пользователя по псевдониму."""
    query = dict(nickname=nickname)
    user = users_collection.find_one(query)

    if user is None:
        print("Такого пользователя не существует")
    else:
        print(f"Псевдоним: {user['nickname']}, "
              f"пароль: {user['password']}, "
              f"закладки: {user['bookmarks']}, "
              f"авторство: {user['books_own']}")


@cli.command()
@click.argument('nickname')
def delete_user(nickname):
    """Удаление пользователя."""
    query = dict(nickname=nickname)
    user = users_collection.find_one(query)

    if user is None:
        print("Такого пользователя не существует")
    else:
        users_collection.insert_one(query)
    click.echo(f'Пользователь "{nickname}" успешно удалён!')


if __name__ == '__main__':
    cli()
