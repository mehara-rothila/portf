// src/components/Navigation.js
import React from 'react';
import { Menu, X } from 'lucide-react';
import PerformanceNavButton from './PerformanceNavButton';

const Navigation = ({ 
  navigation, 
  activeSection, 
  setActiveSection, 
  isMenuOpen, 
  setIsMenuOpen,
  performanceMode,
  togglePerformanceMode
}) => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm dark:shadow-gray-800 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* Logo can be added here if needed */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  activeSection === item.section
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-b-2 hover:border-primary-600 dark:hover:border-primary-400'
                } transition-all duration-200 font-medium py-1`}
                onClick={() => setActiveSection(item.section)}
              >
                {item.name}
              </a>
            ))}
            
            {/* Performance Mode Toggle */}
            <div className="border-l border-gray-300 dark:border-gray-700 h-6 mx-2"></div>
            <PerformanceNavButton 
              performanceMode={performanceMode}
              togglePerformanceMode={togglePerformanceMode}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveSection(item.section);
                }}
              >
                {item.name}
              </a>
            ))}
            
            {/* Performance Mode Toggle for Mobile */}
            <div className="border-t border-gray-300 dark:border-gray-700 my-2 pt-2">
              <PerformanceNavButton 
                performanceMode={performanceMode}
                togglePerformanceMode={togglePerformanceMode}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;