import { useState } from 'react';

import ImageCard from '@/components/MyActivityPage/ImageCard';
import ImageInput from '@/components/MyActivityPage/ImageInput';

// 이미지 리스트 관리를 돕는 훅 (추가 / 제거 / 확인)
const useImageManager = (maxLength: number) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleAddImage = (file: File) => {
    setImageFiles((prev) => [...prev, file]);
  };

  const handleDeleteImage = (file: File) => {
    setImageFiles((prev) => prev.filter((f) => f !== file));
  };

  const renderImageManager = () => (
    <ul className="flex w-full flex-wrap gap-2 pc:gap-6 tablet:gap-4">
      <ImageInput
        disabled={imageFiles.length >= maxLength}
        onChange={handleAddImage}
      />
      {imageFiles.map((file) => (
        <ImageCard image={file} onClickDelete={handleDeleteImage} />
      ))}
    </ul>
  );

  return { imageFiles, renderImageManager };
};

export default useImageManager;
