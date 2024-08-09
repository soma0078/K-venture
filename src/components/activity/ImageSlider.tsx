import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getActivityImages } from '@/lib/utils/activityImageUtils';
import { swiperConfig } from '@/lib/utils/swiperConfig';
import { ActivityResponse } from '@/types/activityTypes';

interface ImageSwiperProps {
  activityData: ActivityResponse;
  className?: string;
}

export default function ImageSwpier({ activityData }: ImageSwiperProps) {
  const images = getActivityImages(activityData);

  return (
    <div className="swiper-container">
      <Swiper {...swiperConfig}>
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="relative h-[310px] w-full max-w-[620px] sm:max-w-[760px]">
              <Image
                src={image.imageUrl}
                alt={image.alt}
                fill
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
