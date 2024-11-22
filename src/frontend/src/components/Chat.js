import React, { useEffect, useState } from 'react';
import '../styles/Chat.css';
import { useAuth } from './AufContext';

const Chat = () => {
  const { nickname } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8001');

    ws.onopen = () => {
      console.log('WebSocket соединение установлено');
    };

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.onclose = () => {
      console.log('WebSocket соединение закрыто');
    };

    ws.onerror = (error) => {
      console.error('WebSocket ошибка:', error);
      console.log('Состояние WebSocket:', ws.readyState); // 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() && socket) {
      const message = {
        nickname: nickname,
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.send(JSON.stringify(message));
      console.log('Отправлено сообщение:', message);
      setInputMessage('');
    }
  };

  const handleChatToggle = () => {
    setShowChat((prevState) => !prevState);
  };

  return (
    <div>
      <div className={`chat-container ${showChat ? 'visible' : ''}`}>
        <div>
          <h2>Чат</h2>
          <div className="messages-scroll">
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.timestamp} {msg.nickname}: </strong>{msg.content}
              </div>
            ))}
          </div>
        </div>
        <input
          type="text"
          className="input-message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Введите сообщение"
        />
        <button onClick={sendMessage} className="send-button">Отправить</button>
      </div>
      <button onClick={handleChatToggle} className="chat-toggle-button">
        {showChat ? "Скрыть чат" : "Показать чат"}
      </button>
    </div>
  );
};

export default Chat;
