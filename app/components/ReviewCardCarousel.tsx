'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, MapPin, User } from 'lucide-react';
import './ReviewCardCarousel.css';

interface ReviewItem {
  id: number;
  reviewerName: string;
  isLocalGuide: boolean;
  localGuideStats: string;
  rating: number;
  timeAgo: string;
  isNew: boolean;
  reviewText: string;
}

interface ReviewCardCarouselProps {
  items: ReviewItem[];
}

export default function ReviewCardCarousel({ items }: ReviewCardCarouselProps) {
  // Start with middle card centered
  // Calculate middle index: currentIndex + 1 should equal the middle index
  const middleIndex = Math.floor((items.length - 1) / 2);
  const [currentIndex, setCurrentIndex] = useState(Math.max(-1, middleIndex - 1));
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(-1, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - 2, prev + 1));
  };

  const scrollToIndex = (index: number) => {
    // Set index so that the clicked card becomes the center (active) card
    setCurrentIndex(Math.min(index - 1, items.length - 2));
  };

  // Calculate offset based on actual card width
  // Center the active card (currentIndex + 1)
  useEffect(() => {
    const calculateOffset = () => {
      if (trackRef.current && innerRef.current) {
        const trackWidth = trackRef.current.offsetWidth;
        const cardWidth = trackWidth / 3;
        const gap = 20;
        // Center the active card (which is at currentIndex + 1)
        // Move the carousel so the active card is at the center position (trackWidth/2)
        const activeIndex = Math.max(0, currentIndex + 1);
        const totalCardWidth = cardWidth + gap;
        // Position active card at center: offset = -(activeIndex * totalCardWidth) + (trackWidth/2 - cardWidth/2)
        const calculatedOffset = -(activeIndex * totalCardWidth) + (trackWidth / 2) - (cardWidth / 2);
        setOffset(calculatedOffset);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const timer = setTimeout(() => {
      requestAnimationFrame(calculateOffset);
    }, 0);
    window.addEventListener('resize', calculateOffset);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateOffset);
    };
  }, [currentIndex]);

  return (
    <div className="review-card-carousel-wrapper">
      <div className="review-card-carousel-container">
        {/* Navigation Arrow - Left */}
        <button
          className="review-card-nav-arrow review-card-nav-left"
          onClick={handlePrevious}
          disabled={currentIndex < 0}
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Carousel Track */}
        <div className="review-card-carousel-track" ref={trackRef}>
          <motion.div
            ref={innerRef}
            className="review-card-carousel-inner"
            animate={{ x: offset }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {items.map((item, index) => {
              // Determine if this is the active (center) card
              // The active card is at currentIndex + 1 (middle of 3 visible cards)
              // When currentIndex = -1, active card is at index 0
              const activeIndex = currentIndex + 1;
              const isActive = index === activeIndex && activeIndex >= 0 && activeIndex < items.length;
              
              return (
                <div 
                  key={item.id} 
                  className={`review-card ${isActive ? 'active' : 'preview'}`}
                >
                  {/* Card Content */}
                  <div className="review-card-content">
                    {/* Header with Name and Rating */}
                    <div className="review-card-header">
                      <h3 className="review-card-title">{item.reviewerName}</h3>
                      <div className="review-card-rating">
                        <Star className="review-card-star-icon" />
                        <span className="review-card-rating-text">{item.rating}</span>
                      </div>
                    </div>

                    {/* Review Text - Truncated to fit fixed size */}
                    <p className="review-card-description">
                      {item.reviewText.length > 200 
                        ? item.reviewText.substring(0, 200) + '...' 
                        : item.reviewText}
                    </p>

                    {/* View Full Review Link */}
                    <a 
                      href="https://g.page/r/your-business-id/review" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="review-card-link"
                    >
                      View full review
                    </a>

                    {/* Reviewer Info at Bottom */}
                    <div className="review-card-footer">
                      <div className="review-card-icon-item">
                        <User className="review-card-icon" />
                        <span className="review-card-icon-text">
                          {item.isLocalGuide ? 'Local Guide' : 'Reviewer'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Arrow - Right */}
        <button
          className="review-card-nav-arrow review-card-nav-right"
          onClick={handleNext}
          disabled={currentIndex >= items.length - 2}
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="review-card-indicators">
        {items.map((_, index) => {
          // Active indicator is the center card (currentIndex + 1)
          const activeIndex = Math.max(0, currentIndex + 1);
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              className={`review-card-indicator ${isActive ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to review ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

