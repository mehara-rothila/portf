// src/components/CertificationCard.js
import React, { useState } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import ImageModal from './ImageModal';

const CertificationCard = ({ certification }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    title, 
    issuer,
    date,
    description, 
    image,
    credentialUrl
  } = certification;

  const openImageModal = () => {
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Award className="text-primary-500" size={24} />
            <h3 className="text-xl font-semibold text-primary-500">
              {title}
            </h3>
          </div>
          <span className="text-gray-500 dark:text-gray-400">
            {date}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          <span className="font-medium">Issued by: {issuer}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Certificate Image */}
          <div className="md:w-1/2">
            <div className="relative group cursor-pointer" onClick={openImageModal}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative w-full h-64 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
                <img
                  src={image}
                  alt={`${title} Certificate`}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 select-none"
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
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {description}
            </p>

            {credentialUrl && (
              <a
                href={credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200 group"
              >
                <ExternalLink className="mr-2 group-hover:scale-110 transition-transform duration-200" size={20} />
                <span className="border-b border-primary-500 border-opacity-0 group-hover:border-opacity-100 transition-all duration-200">
                  Verify Credential
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal 
        image={image} 
        alt={`${title} Certificate`} 
        isOpen={isModalOpen} 
        onClose={closeImageModal} 
      />
    </>
  );
};

export default CertificationCard;