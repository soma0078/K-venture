import LocationIcon from '@/assets/icons/icon_location.svg';

interface LocationProps {
  address: string;
}

export default function Location({ address }: LocationProps) {
  return (
    <div className="flex items-center gap-1">
      <LocationIcon alt="위치 아이콘" />
      <p>{address}</p>
    </div>
  );
}
