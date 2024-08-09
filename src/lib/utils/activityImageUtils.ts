import { ActivityResponse } from '@/types/activityTypes';

export function getActivityImages(activityData: ActivityResponse) {
  return [
    {
      id: 'banner',
      imageUrl: activityData.bannerImageUrl,
      alt: `${activityData.title} 배너 이미지`,
    },
    ...activityData.subImages.map((subImage, idx) => ({
      id: subImage.id,
      imageUrl: subImage.imageUrl,
      alt: `${activityData.title} 서브 이미지 ${idx + 1}`,
    })),
  ];
}
