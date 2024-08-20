import { ReviewTypes } from '@/types/activityReviewTypes';

import { ReviewCount } from './Review';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  id?: number;
  totalCount: number;
  averageRating: number;
  reviews: ReviewTypes[];
  nickname: string;
  profileImageUrl: string;
}

export default function ReviewList({
  totalCount,
  averageRating,
  reviews,
}: ReviewListProps) {
  return (
    <>
      <div className="flex gap-4">
        <span className="text-5xl font-kv-semibold">
          {averageRating.toFixed(1)}
        </span>
        <div className="flex flex-col">
          <span className="text-kv-2lg">
            {averageRating > 4 ? '매우 만족' : '만족'}
          </span>
          <ReviewCount totalCount={totalCount} />
        </div>
      </div>
      <div className="min-h-[430px]">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            createdAt={review.createdAt}
            content={review.content}
            nickname={review.user.nickname}
            profileImageUrl={review.user.profileImageUrl}
          />
        ))}
      </div>
    </>
  );
}
