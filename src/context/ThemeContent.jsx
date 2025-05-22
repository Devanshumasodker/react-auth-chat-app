import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="ml-4 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggleButton;
