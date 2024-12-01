import Image from 'next/image';
import { useState } from 'react';

import { DEFAULT_ACTIVITY_IMAGE } from '@/constants/defaultAssets';
import useResponsive from '@/hooks/useResponsive';
import { getGridCols } from '@/lib/utils/gridUtils';
import { SubImageUrl } from '@/types/activityTypes';

import ImageSwpier from './ImageSlider';

export interface BannerImageProps {
  title: string;
  bannerImageUrl: string;
  subImages: SubImageUrl[];
}

export default function ImageGallery({
  title,
  bannerImageUrl,
  subImages,
}: BannerImageProps) {
  const { isMobile } = useResponsive();

  const [mainBannerUrl, setMainBannerUrl] = useState(bannerImageUrl);
  const [subBannerUrl, setSubBannerUrl] = useState(
    subImages.map((image) => image.imageUrl),
  );

  const handleMainImageError = () => {
    setMainBannerUrl(DEFAULT_ACTIVITY_IMAGE);
  };
  const handleSubImageError = (index: number) => {
    setSubBannerUrl((prev) => {
      const newSubBannerUrls = [...prev];
      newSubBannerUrls[index] = DEFAULT_ACTIVITY_IMAGE;
      return newSubBannerUrls;
    });
  };

  return (
    <>
      {isMobile ? (
        <ImageSwpier
          title={title}
          bannerImageUrl={bannerImageUrl}
          subImages={subImages}
        />
      ) : (
        <div className="mt-6">
          <div className="flex w-full justify-between gap-2">
            <div className={`${subImages.length === 0 ? 'w-full' : 'w-1/2'}`}>
              <div className="relative h-[543px] w-full tablet:h-[310px]">
                <Image
                  src={mainBannerUrl}
                  alt={`${title} 배너 이미지`}
                  fill
                  objectFit="cover"
                  onError={handleMainImageError}
                />
              </div>
            </div>

            <div
              className={`sub-image-container grid w-1/2 gap-2 ${getGridCols(subImages.length)}`}
            >
              {subImages.map(
                (subImage, idx) =>
                  subImage.imageUrl && (
                    <div
                      key={subImage.id}
                      className="sub-image-wrapper relative h-full w-full"
                    >
                      <Image
                        src={subBannerUrl[idx]}
                        alt={`${title} 서브 이미지 ${idx + 1}`}
                        fill
                        objectFit="cover"
                        onError={() => handleSubImageError(idx)}
                      />
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
