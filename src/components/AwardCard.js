// src/components/AwardCard.js - Updated to support 4:3 portrait photos
import React, { useState } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import ImageModal from './ImageModal';

const AwardCard = ({ award }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, issuer, date, description, image, demoUrl } = award;

  // Determine if image is portrait (4:3) or landscape based on filename
  // This is a simple way to handle it without having to load the image first
  const isPortrait = image.includes('coderush');

  return (
    <>
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 interactive-card cursor-pointer">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <div className="flex items-center space-x-2">
            <Award className="text-primary-500" size={24} />
            <h3 className="text-xl font-semibold text-primary-500">{title}</h3>
          </div>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full inline-flex self-start">
            {date}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          <span className="font-medium">Issued by: {issuer}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Award Image */}
          <div className="md:w-1/2">
            <div className="relative group cursor-pointer certificate-container interactive-card" onClick={() => setIsModalOpen(true)}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className={`relative w-full ${isPortrait ? 'h-auto aspect-[4/3]' : 'h-96'} rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800`}>
                <img
                  src={image}
                  alt={title}
                  className={`${isPortrait ? 'w-full h-full object-cover' : 'w-auto h-full mx-auto object-contain'} hover:scale-105 transition-transform duration-300 select-none`}
                  style={isPortrait ? {} : { maxHeight: '100%', maxWidth: '100%' }}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />
                <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-primary-700 dark:text-primary-300 font-medium text-sm bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded">
                    Click to view
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="md:w-1/2">
            <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>

            {demoUrl && demoUrl.length > 0 && (
              <div className="flex flex-wrap">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200 group interactive-card cursor-pointer"
                >
                  <ExternalLink className="mr-2 group-hover:scale-110 transition-transform duration-200" size={20} />
                  <span className="border-b border-primary-500 border-opacity-0 group-hover:border-opacity-100 transition-all duration-200">
                    View Details
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal 
        image={image} 
        alt={title} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default AwardCard;