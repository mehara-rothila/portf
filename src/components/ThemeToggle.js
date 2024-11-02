// src/components/ThemeToggle.js
import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;