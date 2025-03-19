// src/components/ImageModal.js
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ image, alt, isOpen, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard events (Esc key to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent context menu (right-click)
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      onContextMenu={handleContextMenu}
    >
      <div 
        className="relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute -top-4 -right-4 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors z-10"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        {/* Image container */}
        <div className="relative max-w-[80vw] overflow-hidden rounded-lg shadow-2xl">
          <img 
            src={image} 
            alt={alt} 
            className="w-full h-full object-contain animate-scale-in select-none max-h-[85vh]"
            onContextMenu={handleContextMenu}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;