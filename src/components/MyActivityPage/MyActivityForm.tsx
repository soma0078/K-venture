import { MAX_IMG_LENGTH } from '@/constants/myActivityPage';
import useImagesHandler from '@/hooks/useImagesHandler';
import { IMAGE_TYPES } from '@/types/page/myActivityPageTypes';

import ImageList from './ImageList';

export default function MyActivityForm() {
  const banner = useImagesHandler();
  const sub = useImagesHandler();

  return (
    <form className="flex flex-col gap-6">
      <div>
        <h2 className="h2-my-act">배너 이미지</h2>
        <ImageList
          imageFiles={banner.imageFiles}
          maxLength={MAX_IMG_LENGTH[IMAGE_TYPES.BANNER]}
          onAddImage={banner.handleAddImage}
          onDeleteImage={banner.handleDeleteImage}
        />
      </div>
      <div>
        <h2 className="h2-my-act">소개 이미지</h2>
        <ImageList
          imageFiles={sub.imageFiles}
          maxLength={MAX_IMG_LENGTH[IMAGE_TYPES.SUB]}
          onAddImage={sub.handleAddImage}
          onDeleteImage={sub.handleDeleteImage}
        />
      </div>
      <p className="text-kv-2lg text-kv-gray-4b">
        *이미지는 최대 4개까지 등록 가능합니다.
      </p>
    </form>
  );
}
