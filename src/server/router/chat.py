import asyncio
import websockets

users = set()


async def add_user(websocket):
    users.add(websocket)


async def remove_user(websocket):
    users.remove(websocket)


async def socket(websocket, path):
    await add_user(websocket)

    try:
        while True:
            message = await websocket.recv()

            await asyncio.wait([user.send(message) for user in users])
    finally:
        await remove_user(websocket)


def start_websocket_server():
    start_server = websockets.serve(socket, "localhost", 800)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
