import { useState, useEffect, useRef } from 'react';

const ChatSidebar = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!wsRef.current && isOpen) {
      const socket = new WebSocket('wss://echo.websocket.org/.ws');
      wsRef.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
      };

      socket.onmessage = (event) => {
        setMessages((prev) => [
          ...prev,
          { text: event.data, fromUser: false, time: new Date().toLocaleTimeString() },
        ]);
      };

      socket.onclose = () => setIsConnected(false);
      socket.onerror = () => {
        alert('WebSocket error!');
        setIsConnected(false);
      };
    }

    return () => {
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const time = new Date().toLocaleTimeString();
      setMessages((prev) => [...prev, { text: message, fromUser: true, time }]);
      wsRef.current?.send(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Sidebar layout */}
      <div className="flex flex-col h-full">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900 z-10">
          <h2 className="font-semibold text-lg">Chat</h2>
          <button onClick={onClose} className="text-2xl font-bold hover:text-red-500">&times;</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.fromUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs text-sm ${
                  msg.fromUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">{msg.time}</span>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
          <input
            type="text"
            value={message}
            ref={inputRef}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
            placeholder={isConnected ? "Type a message..." : "Connecting..."}
            disabled={!isConnected}
          />
          <button
            onClick={handleSend}
            disabled={!isConnected || !message.trim()}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChatSidebar;
