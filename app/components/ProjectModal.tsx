'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './ProjectModal.css';

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  images?: string[]; // Optional array for multiple images
  technologies?: string[];
  link?: string;
  // Extended details for modal
  fullDescription?: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  client?: string;
  year?: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      // Reset image index when modal opens
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!project || !isOpen) return null;

  const fullDescription = project.fullDescription || project.description;
  // Use images array if available, otherwise use single image
  const images = project.images && project.images.length > 0 
    ? project.images 
    : [project.image];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`project-modal-overlay ${isAnimating ? 'open' : ''}`}
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div className={`project-modal-container ${isAnimating ? 'open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        {/* Close Button */}
        <button
          className="project-modal-close"
          onClick={handleClose}
          aria-label="Close project modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="project-modal-content">
          {/* Header Image(s) */}
          <div className="project-modal-image-container">
            {hasMultipleImages && (
              <button
                className="project-modal-image-nav project-modal-image-nav-left"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <div className="project-modal-image-wrapper">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${project.title} - Image ${index + 1}`}
                  className={`project-modal-image ${index === currentImageIndex ? 'active' : ''}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
            {hasMultipleImages && (
              <button
                className="project-modal-image-nav project-modal-image-nav-right"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
            {hasMultipleImages && (
              <div className="project-modal-image-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`project-modal-image-indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <div className="project-modal-image-overlay" />
          </div>

          {/* Content */}
          <div className="project-modal-body">
            {/* Header */}
            <div className="project-modal-header">
              <div className="project-modal-header-top">
                <span className="project-modal-category">{project.category}</span>
                {project.year && (
                  <span className="project-modal-year">{project.year}</span>
                )}
              </div>
              <h2 id="project-modal-title" className="project-modal-title">
                {project.title}
              </h2>
              {project.client && (
                <p className="project-modal-client">Client: {project.client}</p>
              )}
            </div>

            {/* Full Description */}
            <div className="project-modal-section">
              <h3 className="project-modal-section-title">Overview</h3>
              <p className="project-modal-text">{fullDescription}</p>
            </div>

            {/* Challenges */}
            {project.challenges && (
              <div className="project-modal-section">
                <h3 className="project-modal-section-title">Challenges</h3>
                <p className="project-modal-text">{project.challenges}</p>
              </div>
            )}

            {/* Solutions */}
            {project.solutions && (
              <div className="project-modal-section">
                <h3 className="project-modal-section-title">Solutions</h3>
                <p className="project-modal-text">{project.solutions}</p>
              </div>
            )}

            {/* Results */}
            {project.results && (
              <div className="project-modal-section">
                <h3 className="project-modal-section-title">Results</h3>
                <p className="project-modal-text">{project.results}</p>
              </div>
            )}

            {/* Links */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="project-modal-section">
                <div className="project-modal-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-link project-modal-link-primary"
                    >
                      View Live Site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-link project-modal-link-secondary"
                    >
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

