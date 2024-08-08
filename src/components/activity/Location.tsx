import LocationIcon from '@/assets/icons/icon_location.svg';
import { ActivityResponse } from '@/types/activityTypes';

interface LocationProps {
  activityData: ActivityResponse;
  className?: string;
}

export default function Location({ activityData }: LocationProps) {
  return (
    <div className="flex items-center gap-1">
      <LocationIcon alt="위치 아이콘" />
      <p>{activityData.address}</p>
    </div>
  );
}
