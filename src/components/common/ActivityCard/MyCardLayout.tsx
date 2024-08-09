import Image from 'next/image';
import React from 'react';

type CardProps = {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
};

function MyCardContainer({ imageSrc, imageAlt, children }: CardProps) {
  return (
    <div className="mb-2 flex h-[128px] w-[344px] rounded-[24px] bg-white shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] pc:mb-6 pc:h-[204px] pc:w-[792px] tablet:mb-4 tablet:h-[156px] tablet:w-[429px]">
      <div className="relative h-full w-[128px] overflow-hidden rounded-bl-[24px] rounded-tl-[24px] pc:w-[204px] tablet:w-[156px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          className="rounded-bl-[24px] rounded-tl-[24px]"
        />
      </div>
      <div className="my-[9px] ml-2 mr-[15px] flex h-[111px] w-[193px] flex-col justify-between pc:mx-6 pc:my-[21px] pc:h-[162px] pc:w-[540px] tablet:m-3 tablet:mr-[18px] tablet:h-[132px] tablet:w-[243px]">
        {children}
      </div>
    </div>
  );
}

export default MyCardContainer;
