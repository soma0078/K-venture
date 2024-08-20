import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getActivityImages } from '@/lib/utils/activityImageUtils';
import { swiperConfig } from '@/lib/utils/swiperConfig';

import { BannerImageProps } from './ImageGallery';

export default function ImageSwpier({
  title,
  bannerImageUrl,
  subImages,
}: BannerImageProps) {
  const images = getActivityImages({ title, bannerImageUrl, subImages });

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
