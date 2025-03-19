// src/components/SkillCard.js
import React from 'react';

const SkillCard = ({ category, items }) => {
  return (
    <div className="backdrop-blur-md bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg dark:shadow-gray-800 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
        {category}
      </h3>
      <ul className="space-y-2">
        {items.map((skill) => (
          <li key={skill}
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
            • {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;