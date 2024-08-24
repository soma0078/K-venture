import Image from 'next/image';
import Link from 'next/link';

import KVentureIcon from '/public/assets/icons/logo_big_mobile.svg';
import useImageLoad from '@/hooks/useImageLoad';
import { MyActivity } from '@/types/get/activityTypes';

import RatingStar from '../../../public/assets/icons/icon_star.svg';

export default function BestExperienceCard({ data }: { data: MyActivity }) {
  const { id, bannerImageUrl, title, rating, reviewCount, price } = data;
  const imageError = useImageLoad(bannerImageUrl);
  return (
    <li>
      <Link
        href={`/activity/${id}`}
        className="relative flex h-[219px] max-h-[454px] w-[335px] max-w-[696px] flex-col items-center px-0 pc:mx-[50px] pc:h-[410px] pc:w-[640px] tablet:h-[454px] tablet:w-[696px]"
      >
        <div className="absolute flex h-[219px] w-[335px] pc:h-[410px] pc:w-[640px] tablet:h-[454px] tablet:w-[696px]">
          {imageError ? (
            <div className="flex h-[100%] w-[100%] justify-end bg-kv-blue-light px-2 py-2">
              <KVentureIcon />
            </div>
          ) : (
            <Image
              fill
              // objectFit="cover"
              src={bannerImageUrl}
              alt={title}
              className="absolute rounded-lg"
            />
          )}
        </div>
        <div className="absolute bottom-0 flex w-[100%] flex-col items-start gap-y-2 px-[20px] py-[20px] pc:gap-y-5 tablet:gap-y-5">
          <span className="flex items-center gap-x-2">
            <span className="flex gap-1 text-kv-yellow kv-text-md pc:kv-text-xl tablet:kv-text-xl">
              <RatingStar />
            </span>
            {rating > 0 && reviewCount > 0 && (
              <h3 className="flex gap-1 text-white kv-text-md pc:kv-text-xl tablet:kv-text-xl">
                {rating.toFixed(1)} ({reviewCount})
              </h3>
            )}
            <h3 className="flex text-white kv-text-xl"></h3>
          </span>
          <h2 className="kv-text-bold w-[185px] max-w-[300px] break-all text-white kv-text-xl pc:w-[300px] pc:kv-text-3xl tablet:w-[300px] tablet:kv-text-3xl">
            {title}
          </h2>
          <span className="flex gap-x-1 text-white kv-text-md pc:kv-text-xl tablet:kv-text-xl">
            <h3 className="kv-text-bold">￦{price.toLocaleString()}</h3>
            <h3 className="kv-text-regular">/ 인</h3>
          </span>
        </div>
      </Link>
    </li>
  );
}
