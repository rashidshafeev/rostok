import React, { useEffect, useState } from 'react';

import star from '@assets/icons/adv1grey.svg';
import starhalf from '@assets/icons/adv1half.svg';
import starfill from '@assets/icons/adv1fill.svg';

function RatingStars({ totalStars, initialRating, isActive = false, handleSetRating }) {
  const [rating, setRating] = useState(initialRating || 0);

const handleStarClick = (selectedRating) => {
    if (isActive) {
  setRating(selectedRating);
  handleSetRating(selectedRating);
    }
};

  return (
    <>
    {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        const isHalfFilled = starValue - 0.5 === rating;

        return (
          <img
            className='h-5 w-5'
            key={index}
            src={isFilled ? starfill : isHalfFilled ? starhalf : star}
            alt=""
            onClick={() => handleStarClick(starValue)}
            style={{ cursor: isActive ? 'pointer' : 'default' }}
          />
        );
      })}
   </>
  );
}

export default RatingStars;
