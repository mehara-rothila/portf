// src/components/ProjectCard.js
import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import ImageModal from './ImageModal';

const ProjectCard = ({ project }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageAlt, setImageAlt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    title, 
    period, 
    description, 
    features, 
    images, 
    githubUrl, 
    liveUrl 
  } = project;

  const openImageModal = (image, alt) => {
    setSelectedImage(image);
    setImageAlt(alt);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  // Simple project card (for projects without images)
  if (!images) {
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h3 className="text-xl font-semibold text-primary-500">
            {title}
          </h3>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full inline-flex self-start">
            {period}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {description}
        </p>

        <div className="flex flex-wrap gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200"
            >
              <Github className="mr-2" size={20} /> View Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200"
            >
              <ExternalLink className="mr-2" size={20} /> Live Demo
            </a>
          )}
        </div>
      </div>
    );
  }

  // Advanced project card (with images and features)
  return (
    <>
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h3 className="text-xl font-semibold text-primary-500">
            {title}
          </h3>
          <span className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full inline-flex self-start">
            {period}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {description}
        </p>

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Images Column */}
          {images && images.length > 0 && (
            <div className="md:w-1/2">
              <div className="flex flex-col gap-6">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative group cursor-pointer" 
                    onClick={() => openImageModal(image.src, image.alt)}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative w-full h-64 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
                      <img
                        src={image.src}
                        alt={image.alt}
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
                ))}
              </div>
            </div>
          )}

          {/* Features Column */}
          <div className={images && images.length > 0 ? "md:w-1/2" : "w-full"}>
            {features && features.length > 0 && (
              <>
                <h4 className="text-primary-500 mb-4">Key Features:</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-3 mb-6">
                  {features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </>
            )}

            <div className="flex flex-wrap gap-4">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200 group"
                >
                  <Github className="mr-2 group-hover:scale-110 transition-transform duration-200" size={20} />
                  <span className="border-b border-primary-500 border-opacity-0 group-hover:border-opacity-100 transition-all duration-200">
                    View Code
                  </span>
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200 group"
                >
                  <ExternalLink className="mr-2 group-hover:scale-110 transition-transform duration-200" size={20} />
                  <span className="border-b border-primary-500 border-opacity-0 group-hover:border-opacity-100 transition-all duration-200">
                    Live Demo
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal 
        image={selectedImage} 
        alt={imageAlt} 
        isOpen={isModalOpen} 
        onClose={closeImageModal} 
      />
    </>
  );
};


export default ProjectCard;