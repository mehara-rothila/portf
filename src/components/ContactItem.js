// src/components/ContactItem.js
import React from 'react';

const ContactItem = ({ icon, text, href }) => {
  return (
    <div className="flex items-center space-x-4 group">
      <span className="text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
        {icon}
      </span>
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
      >
        {text}
      </a>
    </div>
  );
};

export default ContactItem;