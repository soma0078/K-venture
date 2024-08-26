import React, { useState } from 'react';

import StarOffIcon from '@/assets/icons/icon_star_off.svg';
import StarOnIcon from '@/assets/icons/icon_star_on.svg';

interface StarRatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

export default function StarRating({
  rating,
  onRatingChange,
}: StarRatingProps) {
  return (
    <div className="my-[34px] h-[70px] w-full align-center">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className="cursor-pointer"
          onClick={() => onRatingChange(index + 1)}
        >
          {index < rating ? (
            <div className="mr-[4px] h-[56px] w-[56px]">
              <StarOnIcon />
            </div>
          ) : (
            <div className="mr-[4px] h-[56px] w-[56px]">
              <StarOffIcon />
            </div>
          )}
        </span>
      ))}
    </div>
  );
}
