'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';
import './ReviewCarousel.css';

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

interface ReviewCarouselProps {
  items: ReviewItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

export default function ReviewCarousel({
  items,
  baseWidth = 400,
  autoplay = true,
  autoplayDelay = 5000,
  pauseOnHover = true,
  loop = true,
  round = false
}: ReviewCarouselProps) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Ensure currentIndex is always valid
  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, carouselItems.length - 1));

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered) && !isResetting) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          // Don't allow autoplay to go to duplicate item if we're already at a valid index
          if (prev >= items.length) {
            return 0;
          }
          if (prev === items.length - 1 && loop) {
            return prev + 1; // Go to duplicate for seamless loop
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover, isResetting]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && safeCurrentIndex === carouselItems.length - 1 && safeCurrentIndex === items.length) {
      // Only reset if we're at the duplicate first item (end of loop)
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  // Handle manual navigation to prevent issues with reset
  const handleManualNavigation = (newIndex: number) => {
    // Prevent going to duplicate item during manual navigation
    if (loop && newIndex >= items.length) {
      newIndex = 0;
    }
    // If we're in a reset state, wait for it to complete
    if (isResetting) {
      setTimeout(() => {
        setCurrentIndex(newIndex);
      }, 100);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const handleDragEnd = (_: any, info: any) => {
    if (isResetting) return; // Don't allow drag during reset
    
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      // Move to next, but wrap to 0 if we're at the last real item (for loop)
      if (loop && safeCurrentIndex >= items.length - 1) {
        handleManualNavigation(0);
      } else {
        handleManualNavigation(Math.min(safeCurrentIndex + 1, items.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      // Move to previous, wrapping to last item if at 0
      if (loop && safeCurrentIndex === 0) {
        handleManualNavigation(items.length - 1);
      } else {
        handleManualNavigation(Math.max(safeCurrentIndex - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0
        }
      };

  return (
    <div
      ref={containerRef}
      className={`review-carousel-container ${round ? 'round' : ''}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: '50%' })
      }}
    >
      <motion.div
        className="review-carousel-track"
        drag={!isResetting ? "x" : false}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${safeCurrentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(safeCurrentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`review-carousel-item ${round ? 'round' : ''}`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : 'auto',
                minHeight: '400px',
                rotateY: rotateY,
                ...(round && { borderRadius: '50%' })
              }}
              transition={effectiveTransition}
            >
              <div className="review-carousel-item-header">
                <div className="review-avatar">
                  <span>{item.reviewerName.charAt(0)}</span>
                </div>
                <div className="review-info">
                  <div className="review-name-row">
                    <h3 className="review-name">{item.reviewerName}</h3>
                    {item.isLocalGuide && (
                      <span className="review-local-guide">Local Guide</span>
                    )}
                  </div>
                  <p className="review-stats">{item.localGuideStats}</p>
                </div>
              </div>
              <div className="review-carousel-item-content">
                <div className="review-rating-row">
                  <div className="review-stars">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="review-star" />
                    ))}
                  </div>
                  <span className="review-time">{item.timeAgo}</span>
                  {item.isNew && <span className="review-new-badge">NEW</span>}
                </div>
                <p className="review-text">{item.reviewText}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className={`review-carousel-indicators-container ${round ? 'round' : ''}`}>
        <div className="review-carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`review-carousel-indicator ${safeCurrentIndex % items.length === index ? 'active' : 'inactive'}`}
              animate={{
                scale: safeCurrentIndex % items.length === index ? 1.2 : 1
              }}
              onClick={() => {
                if (!isResetting) {
                  handleManualNavigation(index);
                }
              }}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

