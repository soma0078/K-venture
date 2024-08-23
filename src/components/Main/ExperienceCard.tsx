import Image from 'next/image';
import Link from 'next/link';

import KVentureIcon from '/public/assets/icons/logo_big_mobile.svg';
import useImageLoad from '@/hooks/useImageLoad';
import { ActivityListItem } from '@/types/activityTypes';

import RatingStar from '../../../public/assets/icons/icon_star_md.svg';

export default function ExperienceCard({ data }: { data: ActivityListItem }) {
  const { id, bannerImageUrl, title, rating, price, reviewCount } = data;
  const imageError = useImageLoad(bannerImageUrl);

  return (
    <li key={id} className="flex flex-col">
      <Link href={`/activity/${id}`}>
        <span className="relative flex h-[168px] w-[168px] items-center rounded-lg pc:h-[283px] pc:w-[283px] tablet:h-[221px] tablet:w-[221px]">
          {imageError ? (
            <KVentureIcon />
          ) : (
            <Image
              fill
              // objectFit="cover"
              src={bannerImageUrl}
              alt={title}
              className="absolute rounded-lg"
            />
          )}
        </span>
        <span className="flex items-center gap-x-1">
          <RatingStar />
          <h3 className="font-kv-bold">{rating > 0 ? rating.toFixed(1) : 0}</h3>
          <h3 className="font-kv-bold">({reviewCount})</h3>
        </span>
        <span className="font-kv-bold kv-text-lg">{title}</span>
        <span className="flex gap-x-1 kv-text-lg">
          <h3 className="font-kv-bold">￦ {price.toLocaleString()}</h3>
          <h3> / 인</h3>
        </span>
      </Link>
    </li>
  );
}
