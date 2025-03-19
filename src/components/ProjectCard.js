// src/components/ProjectCard.js
import React, { useState } from 'react';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';
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
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-primary-500">
            {title}
          </h3>
          <span className="text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
            {period}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {description}
        </p>

        <div className="flex space-x-6">
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
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {title}
          </h3>
          <span className="text-gray-600 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
            {period}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
          {description}
        </p>

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Images Column */}
          {images && images.length > 0 && (
            <div className="md:w-1/2">
              <div className="flex flex-col gap-6">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative group cursor-pointer transform hover:-translate-y-1 transition-all duration-300" 
                    onClick={() => openImageModal(image.src, image.alt)}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                    <div className="relative w-full h-64 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 select-none"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-gray-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-medium px-4 py-2 rounded-lg backdrop-blur-sm bg-gray-900/60 flex items-center">
                          View Image <ChevronRight size={16} className="ml-1" />
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
                <h4 className="text-xl font-semibold text-primary-500 mb-6 flex items-center">
                  <span className="h-6 w-1 bg-gradient-to-b from-primary-500 to-secondary-500 rounded mr-3"></span>
                  Key Features
                </h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-3 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="flex space-x-6 pt-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
                >
                  <Github className="mr-2 group-hover:scale-110 transition-transform duration-200" size={20} />
                  <span>View Code</span>
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary-600 dark:bg-primary-700 text-white font-medium hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200 group"
                >
                  <ExternalLink className="mr-2 group-hover:scale-110 transition-transform duration-200" size={20} />
                  <span>Live Demo</span>
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
