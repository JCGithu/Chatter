import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

import '../scss/App.scss';

import ChatBubble from './components/chatBubble';

const socket = io('http://localhost:3000', { transports: ['websocket'], reconnection: false });

function App() {
  const [chats, chatUpdate] = useState([]);
  const appRef = useRef(null);

  useEffect(() => {
    socket.on('connect_error', (err) => {
      console.error(err);
    });
    socket.on('newMsg', (msg, user, style) => {
      let newChat = chats.concat([{ msg, user, style }]);
      chatUpdate(newChat);
      if (appRef.current.getBoundingClientRect().height > window.innerHeight - 50) {
        newChat.shift();
        chatUpdate(newChat);
      }
    });
  }, [chats]);

  return (
    <section className="App" ref={appRef}>
      {chats.map((chat, index) => (
        <ChatBubble key={index} chat={chat}></ChatBubble>
      ))}
    </section>
  );
}

export default App;
