import { useEffect, useState } from 'react';

const useImageLoad = (imageUrl?: string | null) => {
  const [imgError, setImgError] = useState<boolean | undefined>();

  useEffect(() => {
    if (!imageUrl) {
      setImgError(true);
      return;
    }

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setImgError(false);
    };

    img.onerror = () => {
      setImgError(true);
    };
  }, [imageUrl]);

  return imgError;
};

export default useImageLoad;
