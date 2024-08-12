import StartIcon from '@/assets/icons/icon_star.svg';

interface ReviewProps {
  reviewCount: number;
  rating: number;
  className?: string;
}

export function ReviewRating({ reviewCount, rating }: ReviewProps) {
  return (
    <div className="flex items-center gap-1">
      <StartIcon alt="별 아이콘" />
      <p>
        {rating} ({reviewCount.toLocaleString()})
      </p>
    </div>
  );
}

export function ReviewCount({ reviewCount }: ReviewProps) {
  return (
    <div className="flex items-center gap-1">
      <StartIcon alt="별 아이콘" />
      <p>{reviewCount.toLocaleString()}개</p>
    </div>
  );
}
