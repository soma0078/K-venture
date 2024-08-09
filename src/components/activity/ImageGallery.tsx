import Image from 'next/image';

import useResponsive from '@/hooks/useResponsive';
import { getGridCols } from '@/lib/utils/gridUtils';
import { ActivityResponse } from '@/types/activityTypes';

import ImageSwpier from './ImageSlider';

interface ImageGalleryProps {
  activityData: ActivityResponse;
}

export default function ImageGallery({ activityData }: ImageGalleryProps) {
  const { isMobile } = useResponsive();

  return (
    <>
      {isMobile ? (
        <ImageSwpier activityData={activityData} />
      ) : (
        <div className="mt-6">
          <div className="flex w-full justify-between gap-2">
            <div
              className={`${activityData.subImages.length === 0 ? 'w-full' : 'w-1/2'}`}
            >
              <div className="relative h-[543px] w-full tablet:h-[310px]">
                <Image
                  src={activityData.bannerImageUrl}
                  alt={`${activityData.title} 배너 이미지`}
                  fill
                  objectFit="cover"
                />
              </div>
            </div>

            <div
              className={`sub-image-container grid w-1/2 gap-2 ${getGridCols(activityData.subImages.length)}`}
            >
              {activityData.subImages.map(
                (subImage, idx) =>
                  subImage.imageUrl && (
                    <div
                      key={subImage.id}
                      className="sub-image-wrapper relative h-full w-full"
                    >
                      <Image
                        src={subImage.imageUrl}
                        alt={`${activityData.title} 서브 이미지 ${idx + 1}`}
                        fill
                        objectFit="cover"
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
