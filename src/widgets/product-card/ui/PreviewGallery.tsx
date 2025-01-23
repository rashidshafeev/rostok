import React, { useState } from 'react';

// import './PreviewGallery.css';
import { ComparisonButton } from '@/features/comparison';
import { FavoriteButton } from '@/features/favorite';
import noImg from '@/shared/assets/images/no-image.png';
import { ComparisonIcon, FavoriteIcon } from '@/shared/ui/icons';

import type { Product } from '@/entities/product';

interface PreviewGalleryProps {
  product: Product;
}

export const PreviewGallery = ({ product }: PreviewGalleryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50; // Adjust this value as needed

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hoveredIndex < product?.files?.length - 1) {
      setHoveredIndex(hoveredIndex + 1);
    } else if (isRightSwipe && hoveredIndex > 0) {
      setHoveredIndex(hoveredIndex - 1);
    }
  };

  const handleMouseMove = (e) => {
    if (product?.files?.length > 1) {
      const { width, left } = e.currentTarget.getBoundingClientRect();
      const hoverPosition = e.clientX - left;
      const newIndex = Math.floor(
        (hoverPosition / width) * product?.files?.length
      );
      if (newIndex >= 0 && newIndex < product?.files?.length) {
        setHoveredIndex(newIndex);
      }
    }
  };

  const displayedImage =
    product?.files?.length > 0 ? product?.files[hoveredIndex]?.medium : noImg;
  const objectFitClass = product?.files[hoveredIndex]?.stretch_image
    ? 'object-cover'
    : 'object-contain';

  return (
    <>
      <div
        className="group h-[170px] mm:h-[220px] rounded-md mm:rounded-xl overflow-hidden relative bg-gray-200 flex justify-center items-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* {product?.files?.length > 0 && (
            <div className="flex flex-col items-center justify-center">
            <img
              onMouseMove={handleMouseMove}
              className="w-full h-full object-contain"
              src={displayedImage}
            />
            <div className="flex justify-center mt-2">
              {product?.files?.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 mx-1 rounded-full transition-colors duration-300 ${
                    index === hoveredIndex ? "bg-gray-700" : "bg-gray-400"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        )} */}
        {/* <div className="flex flex-col items-center justify-center "> */}
        <div className="absolute bg-white  bg-opacity-30 backdrop-blur-lg rounded-lg overflow-hidden h-full w-full sc ">
          <img
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredIndex(0)}
            src={displayedImage}
            className={`w-full h-full ${objectFitClass}`}
          />
        </div>
        <div className=" flex flex-col items-center">
          {/* <div className="w-full h-full"> */}
          <img
            src={displayedImage}
            className={`w-full h-full ${objectFitClass}`}
          />
          {/* </div> */}
        </div>
        {/* <img
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredIndex(0)}
              className="w-full h-full object-contain"
              src={displayedImage}
            /> */}

        {/* </div> */}
        <div className="absolute top-2 w-full px-2 z-10 flex justify-between items-start">
          {product?.tags?.length > 0 ? (
            <span
              style={{
                color: product.tags[0].text_color,
                backgroundColor: product.tags[0].background_color,
              }}
              className={`bg-[${product.tags[0].background_color}] py-1 px-1.5 lg:px-2 uppercase text-[8px] lg:text-xs font-semibold rounded-xl`}
            >
              {product.tags[0].text}
            </span>
          ) : null}
          {/* <FavoriteButton product={product}>
            {({ isLoading, isInFavorite, handleFavoriteClick }) => (
              <FavoriteIcon
                onClick={isLoading ? null : handleFavoriteClick}
                className={`${
                  isLoading ? 'cursor-wait' : 'cursor-pointer'
                } transition-all duration-500 hover:scale-110 absolute right-2`}
                favorite={isInFavorite ? 'true' : 'false'}
              />
            )}
          </FavoriteButton> */}
          <FavoriteButton product={product} className="cursor-pointer w-6 h-6 rounded-full bg-colSuperLight flex items-center justify-center transition-all duration-200 hover:scale-110 absolute top-2 right-2" />
        </div>
        <ComparisonButton
          product={product}
          className="cursor-pointer w-6 h-6 rounded-full bg-colSuperLight flex items-center justify-center transition-all duration-200 hover:scale-110 absolute bottom-2 right-2"
        />
      </div>
      <div className="flex justify-center mt-2">
        {product?.files?.length > 1
          ? product?.files?.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 mx-1 rounded-full transition-colors duration-300 ${
                  index === hoveredIndex ? 'bg-colGreen' : 'bg-gray-400'
                }`}
              ></span>
            ))
          : null}
        {product?.files?.length <= 1 || !product?.files ? (
          <span className="h-2"></span>
        ) : null}
      </div>
    </>
  );
};
