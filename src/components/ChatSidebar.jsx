// src/components/ChatSidebar.jsx
import { useState, useEffect, useRef } from 'react';
import { useSendMessageMutation } from '../utils/chatSocketApi';

const ChatSidebar = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sendMessage] = useSendMessageMutation();
  const wsRef = useRef(null);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket('wss://echo.websocket.org/.ws');

      wsRef.current.onmessage = (event) => {
        setMessages((prev) => [...prev, { text: event.data, fromUser: false }]);
      };
    }

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const handleSend = async () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, fromUser: true }]);
      wsRef.current?.send(message);
      setMessage('');
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h2 className="font-semibold text-lg">Chat</h2>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-xs ${
                msg.fromUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 dark:bg-gray-700 self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t dark:border-gray-700">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
