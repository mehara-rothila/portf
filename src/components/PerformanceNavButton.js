// src/components/PerformanceNavButton.js
import React from 'react';
import { Zap, ZapOff } from 'lucide-react';

const PerformanceNavButton = ({ performanceMode, togglePerformanceMode }) => {
  return (
    <button
      onClick={togglePerformanceMode}
      className="flex items-center px-3 py-1 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
      aria-label="Toggle Performance Mode"
      title={performanceMode ? "Switch to High Quality Mode" : "Switch to Performance Mode"}
    >
      {performanceMode ? (
        <>
          <Zap className="mr-1" size={16} />
          <span className="hidden sm:inline">Performance</span>
        </>
      ) : (
        <>
          <ZapOff className="mr-1" size={16} />
          <span className="hidden sm:inline">Quality</span>
        </>
      )}
    </button>
  );
};

export default PerformanceNavButton;