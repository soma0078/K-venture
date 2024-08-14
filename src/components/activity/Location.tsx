import LocationIcon from '@/assets/icons/icon_location.svg';

interface LocationProps {
  address: string;
}

export default function Location({ address }: LocationProps) {
  return (
    <div className="flex items-center gap-1">
      <LocationIcon />
      <p>{address}</p>
    </div>
  );
}
