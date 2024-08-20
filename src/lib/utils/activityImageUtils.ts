import { BannerImageProps } from '@/components/activity/ImageGallery';

export function getActivityImages({
  title,
  bannerImageUrl,
  subImages,
}: BannerImageProps) {
  return [
    {
      id: 'banner',
      imageUrl: bannerImageUrl,
      alt: `${title} 배너 이미지`,
    },
    ...subImages.map((subImage, idx) => ({
      id: subImage.id,
      imageUrl: subImage.imageUrl,
      alt: `${title} 서브 이미지 ${idx + 1}`,
    })),
  ];
}
