import { ReviewTypes } from '@/types/activityReviewTyes';

import { ReviewCount } from './Review';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  totalCount: number;
  averageRating: number;
  reviews: ReviewTypes[];
}

export default function ReviewList({
  totalCount,
  averageRating,
  reviews,
}: ReviewListProps) {
  return (
    <>
      <p>{averageRating.toFixed(1)}</p>
      <ReviewCount totalCount={totalCount} />
      {reviews.map((review) => (
        <ReviewItem createdAt={review.createdAt} content={review.content} />
      ))}
    </>
  );
}
