import Image from 'next/image';
import Link from 'next/link';

import { DEFAULT_ACTIVITY_IMAGE } from '@/constants/defaultAssets';
import useImageLoad from '@/hooks/useImageLoad';
import { ActivityListItem } from '@/types/activityTypes';

import RatingStar from '../../../public/assets/icons/icon_star_md.svg';

export default function ExperienceCard({ data }: { data: ActivityListItem }) {
  const { id, bannerImageUrl, title, rating, price, reviewCount } = data;
  const imageError = useImageLoad(bannerImageUrl);

  return (
    <li key={id} className="flex flex-col">
      <Link href={`/activity/${id}`}>
        <span className="relative flex h-[168px] w-[168px] items-center rounded-[24px] shadow-[0px_20px_20px_10px_#00000024] pc:h-[283px] pc:w-[283px] tablet:h-[221px] tablet:w-[221px]">
          <Image
            fill
            objectFit="cover"
            src={imageError ? DEFAULT_ACTIVITY_IMAGE : bannerImageUrl}
            alt={title}
            className="absolute rounded-[24px]"
          />
        </span>
        <span className="flex items-center gap-x-1 py-[10px]">
          <RatingStar />
          {rating > 0 && <h3 className="font-kv-bold">{rating.toFixed(1)}</h3>}
          {reviewCount > 0 && <h3 className="font-kv-bold">({reviewCount})</h3>}
        </span>
        <span className="text-overflow-oneline flex max-w-[165px] font-kv-bold kv-text-lg pc:w-[280px] pc:max-w-[280px] tablet:w-[210px] tablet:max-w-[280px]">
          {title}
        </span>
        <span className="flex gap-x-1 kv-text-lg">
          <h3 className="font-kv-bold">￦ {price.toLocaleString()}</h3>
          <h3> / 인</h3>
        </span>
      </Link>
    </li>
  );
}
