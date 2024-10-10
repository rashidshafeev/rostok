// src/components/ProductGalleryTest.tsx

import React, { useState, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
// import './ProductGalleryTest.css';
import noImg from '../../assets/images/no-image.png';

function ProductGalleryTest({ files, infiniteScroll = true }) {
  const images = [];

  files?.length
    ? files?.forEach((file, index) => {
        if (file.type === 'image') {
          images.push({
            index: index,
            src: file.large,
            original: file.large,
            thumbnail: file.small,
          });
        } else if (file.type === 'video') {
          images.push({
            index: index,
            type: 'video',
            width: 1280,
            height: 720,
            sources: [
              {
                src: file.url,
                type: 'video/mp4',
              },
            ],
            embedUrl: file.url,
            thumbnail: 'video/mp4',
            originalHeight: '480px',
          });
        }
      })
    : images.push({
        original: noImg,
        thumbnail: noImg,
      });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0); // Track the current translateX value
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if it's mobile
  const thumbnailsRef = useRef(null);

  // Listen to resize event to update mobile status
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to smoothly slide the images
  const slideImages = (newIndex) => {
    const direction = newIndex > currentImageIndex ? 1 : -1; // Determine the direction of swipe
    setTranslateX(direction * 100); // Move the image wrapper accordingly
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setTranslateX(0); // Reset translation for smooth back to position
    }, 500); // Match with transition duration
  };

  // Swipe handlers for swipeable events
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (isMobile) handleNextClick(); // Only handle swipes on mobile
    },
    onSwipedRight: () => {
      if (isMobile) handlePrevClick(); // Only handle swipes on mobile
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
  });

  const handleThumbnailClick = (index) => {
    slideImages(index);
  };

  const scrollToThumbnail = (index) => {
    const thumbnail = thumbnailsRef.current?.children[index];
    if (thumbnail) {
      thumbnail.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  const handlePrevClick = () => {
    let newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    if (!infiniteScroll && currentImageIndex === 0) return; // Disable prev if not infinite scroll
    slideImages(newIndex);
    scrollToThumbnail(newIndex);
  };

  const handleNextClick = () => {
    let newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    if (!infiniteScroll && currentImageIndex === images.length - 1) return; // Disable next if not infinite scroll
    slideImages(newIndex);
    scrollToThumbnail(newIndex);
  };

  // Handle infinite scrolling toggle
  useEffect(() => {
    scrollToThumbnail(currentImageIndex);
  }, [currentImageIndex]);

  // Calculate visible indexes (previous, current, next)
  const prevIndex = (currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1) % images.length;
  const nextIndex = (currentImageIndex + 1) % images.length;

  return (
    <div className="gallery">
      <div className="main-image-container" {...(isMobile ? swipeHandlers : {})}>
        <div
          className="main-image-wrapper"
          style={{
            transform: `translateX(${translateX}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.original}
              alt="Main Image"
              className={`main-image ${
                index === currentImageIndex || index === prevIndex || index === nextIndex ? 'visible' : ''
              }`}
            />
          ))}
        </div>
      </div>
      <div className="thumbnails-container" ref={thumbnailsRef}>
        <div className="thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.thumbnail}
              alt={`Image ${index + 1}`}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>
      <div className="controls">
        <button id="prevButton" onClick={handlePrevClick}>
          Previous
        </button>
        <button id="nextButton" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductGalleryTest;
