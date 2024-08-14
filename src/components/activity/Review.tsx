import StartIcon from '@/assets/icons/icon_star.svg';

interface ReviewProps {
  reviewCount: number;
  rating: number;
  className?: string;
}

interface TotalCountProps {
  totalCount: number;
}

export function ReviewRating({ reviewCount, rating }: ReviewProps) {
  return (
    <div className="flex items-center gap-1">
      <StartIcon />
      <p>
        {rating} ({reviewCount.toLocaleString()})
      </p>
    </div>
  );
}

export function ReviewCount({ totalCount }: TotalCountProps) {
  return (
    <div className="flex items-center gap-1">
      <StartIcon />
      <p>{totalCount.toLocaleString()}개 후기</p>
    </div>
  );
}
