export interface ReviewTypes {
  id: number;
  user: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityReviewsResponse {
  averageRating: number;
  totalCount: number;
  reviews: ReviewTypes[];
}
