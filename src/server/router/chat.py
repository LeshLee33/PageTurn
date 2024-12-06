import asyncio
import websockets

users = set()

async def add_user(websocket):
    users.add(websocket)

async def remove_user(websocket):
    users.remove(websocket)

async def socket(websocket, path):
    await add_user(websocket)
    print("Пользователь подключен")
    try:
        while True:
            message = await websocket.recv()
            print(f"Получено сообщение: {message}")  # Логируем полученное сообщение
            # Создаем задачи для отправки сообщения всем пользователям
            await asyncio.gather(*(asyncio.create_task(user.send(message)) for user in users))
    except websockets.ConnectionClosed:
        print("Соединение закрыто")
    except Exception as e:
        print(f"Ошибка: {e}")  # Логируем любые ошибки
    finally:
        await remove_user(websocket)
        print("Пользователь отключен")

def start_websocket_server():
    start_server = websockets.serve(socket, "localhost", 8002)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()

if __name__ == "__main__":
    start_websocket_server()