import { MAX_IMG_LENGTH } from '@/constants/myActivityPage';
import useImageManager from '@/hooks/useImageManager';
import { IMAGE_TYPES } from '@/types/page/myActivityPageTypes';

export default function MyActivityForm() {
  const banner = useImageManager(MAX_IMG_LENGTH[IMAGE_TYPES.BANNER]);
  const sub = useImageManager(MAX_IMG_LENGTH[IMAGE_TYPES.SUB]);

  return (
    <form className="flex flex-col gap-6">
      <div>
        <h2 className="h2-my-act">배너 이미지</h2>
        {banner.renderImageManager()}
      </div>

      <div>
        <h2 className="h2-my-act">소개 이미지</h2>
        {sub.renderImageManager()}
      </div>
      <p className="text-kv-2lg text-kv-gray-4b">
        *이미지는 최대 4개까지 등록 가능합니다.
      </p>
    </form>
  );
}
