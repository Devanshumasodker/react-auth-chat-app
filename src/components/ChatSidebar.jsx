import { useState } from 'react';
import { FaComments } from 'react-icons/fa';

const ChatSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
        onClick={() => setOpen(!open)}
      >
        <FaComments size={20} />
      </button>

      {open && (
        <div className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 shadow-lg p-4 z-40">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Chat</h2>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Chat UI will go here.
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSidebar;
