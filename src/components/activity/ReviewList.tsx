import { ReviewTypes } from '@/types/activityReviewTyes';

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
  nickname,
  profileImageUrl,
}: ReviewListProps) {
  return (
    <>
      <p>{averageRating.toFixed(1)}</p>
      <ReviewCount totalCount={totalCount} />
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          createdAt={review.createdAt}
          content={review.content}
          nickname={nickname}
          profileImageUrl={profileImageUrl}
        />
      ))}
    </>
  );
}
