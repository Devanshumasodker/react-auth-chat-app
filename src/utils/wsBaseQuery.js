// src/utils/wsBaseQuery.js
export const baseWsQuery = ({ url }) => {
  let socket;

  return () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      socket = new WebSocket(url);
    }

    return {
      send: (message) => socket.send(message),
      onMessage: (callback) => {
        socket.onmessage = (event) => {
          callback(event.data);
        };
      },
      socket,
    };
  };
};
