// src/components/PerformanceToggle.js
import React from 'react';
import { Zap, ZapOff } from 'lucide-react';

const PerformanceToggle = ({ performanceMode, togglePerformanceMode }) => {
  return (
    <button
      onClick={togglePerformanceMode}
      className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
      aria-label="Toggle Performance Mode"
      title={performanceMode ? "Switch to High Quality" : "Switch to Performance Mode"}
    >
      {performanceMode ? (
        <Zap className="w-6 h-6 text-yellow-400" />
      ) : (
        <ZapOff className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
};

export default PerformanceToggle;