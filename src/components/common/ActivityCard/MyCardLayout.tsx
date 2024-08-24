import Image from 'next/image';
import React, { useState } from 'react';

type CardProps = {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
};

function MyCardContainer({ imageSrc, imageAlt, children }: CardProps) {
  const [src, setSrc] = useState(imageSrc);

  const handleError = () => {
    setSrc('/assets/images/default_img.png');
  };

  return (
    <div className="mb-2 flex h-[128px] w-full rounded-[24px] bg-white shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] pc:mb-6 pc:h-[204px] tablet:mb-4 tablet:h-[156px]">
      <div className="relative h-full w-[128px] overflow-hidden rounded-bl-[24px] rounded-tl-[24px] pc:w-[204px] tablet:w-[156px]">
        <Image
          src={src}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 204px, (min-width: 768px) 156px, 128px"
          priority
          className="rounded-bl-[24px] rounded-tl-[24px] object-cover"
          onError={handleError}
        />
      </div>
      <div className="my-[9px] ml-2 mr-[15px] flex h-[111px] flex-1 flex-col justify-between pc:mx-6 pc:my-[21px] pc:h-[162px] tablet:m-3 tablet:mr-[18px] tablet:h-[132px]">
        {children}
      </div>
    </div>
  );
}

export default MyCardContainer;
