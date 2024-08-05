import { useState } from 'react';

// 이미지 리스트 관리를 돕는 훅 (추가 / 확인 / 제거)
const useImageHandler = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleAddImage = (file: File) => {
    setImageFiles((prev) => [...prev, file]);
  };

  const handleDeleteImage = (file: File) => {
    setImageFiles((prev) => prev.filter((f) => f !== file));
  };

  return { imageFiles, handleAddImage, handleDeleteImage };
};

export default useImageHandler;
