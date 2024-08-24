import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { DEFAULT_ACTIVITY_IMAGE } from '@/constants/defaultAssets';
import { getActivityImages } from '@/lib/utils/activityImageUtils';
import { swiperConfig } from '@/lib/utils/swiperConfig';

import { BannerImageProps } from './ImageGallery';

export default function ImageSwpier({
  title,
  bannerImageUrl,
  subImages,
}: BannerImageProps) {
  const images = getActivityImages({ title, bannerImageUrl, subImages });

  const [mobileBannerUrl, setMobileBannerUrl] = useState(
    images.map((image) => image.imageUrl),
  );

  const handleMobileImageError = (index: number) => {
    setMobileBannerUrl((prev) => {
      const newMobileBannerUrls = [...prev];
      newMobileBannerUrls[index] = DEFAULT_ACTIVITY_IMAGE;
      return newMobileBannerUrls;
    });
  };

  return (
    <div className="swiper-container">
      <Swiper {...swiperConfig}>
        {images.map((image, idx) => (
          <SwiperSlide key={image.id}>
            <div className="relative h-[310px] w-full max-w-[620px] sm:max-w-[760px]">
              <Image
                src={mobileBannerUrl[idx]}
                alt={image.alt}
                fill
                objectFit="cover"
                onError={() => handleMobileImageError(idx)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
