import Link from 'next/link';
import { useRouter } from 'next/router';

import CustomKebab from '@/components/activity/CustomKebab';
import ImageGallery from '@/components/activity/ImageGallery';
import KakaoMap from '@/components/activity/KakaoMap';
import Location from '@/components/activity/Location';
import ReservationCard from '@/components/activity/ReservationCard';
import { ReviewRating } from '@/components/activity/Review';
import ReviewList from '@/components/activity/ReviewList';
import EmptyState from '@/components/common/EmptyState';
import Pagination from '@/components/common/Pagination';
import ActivityPageSkeleton from '@/components/skeletons/ActivityPageSkeleton';
import useFetchData from '@/hooks/useFetchData';
import { usePagination } from '@/hooks/usePagination';
import { getActivity, getActivityReview } from '@/lib/apis/getApis';
import { getUserData } from '@/lib/apis/userApis';
import { ActivityResponse } from '@/types/activityTypes';

const PAGE_LIMIT = 3;

export default function ActivityPage() {
  const router = useRouter();
  const activityId = Number(router.query.id);

  // 체험 상세 데이터 가져오기
  const { data: activityData, isLoading: isActivityLoading } =
    useFetchData<ActivityResponse>(
      ['activity', activityId],
      () => getActivity(activityId),
      {
        enabled: !!activityId,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    );

  // 유저 데이터 가져오기
  const { data: userData, isLoading: isUserLoading } = useFetchData(
    ['user'],
    getUserData,
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  // 후기 데이터 가져오기
  const {
    page,
    setPage,
    totalPages,
    data: reviewData,
  } = usePagination({
    queryKey: ['activityReview', activityId],
    queryFn: (page) => getActivityReview(activityId, page),
    pageLimit: PAGE_LIMIT,
    initialPage: 1,
  });

  const isLoading = isActivityLoading || isUserLoading;

  if (isLoading) return <ActivityPageSkeleton />;

  if (!activityData) {
    return (
      <div>
        <EmptyState message="존재하지 않는 체험입니다." />
        <Link
          href="/"
          className="m-auto mt-6 w-40 rounded-lg bg-kv-primary-blue py-3 font-kv-medium text-white align-center hover:bg-kv-primary-blue-hover"
        >
          메인으로
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <span>{activityData.category}</span>
          <h2 className="mb-4 mt-2 text-kv-3xl font-kv-bold mobile:text-kv-2xl">
            {activityData.title}
          </h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <ReviewRating
              reviewCount={activityData.reviewCount}
              rating={activityData.rating}
            />
            <Location address={activityData.address} />
          </div>
        </div>
        {activityData.userId === userData?.id && (
          <CustomKebab activityId={activityId} />
        )}
      </div>

      <ImageGallery
        title={activityData.title}
        bannerImageUrl={activityData.bannerImageUrl}
        subImages={activityData.subImages}
      />
      <div className="flex justify-between gap-6 mobile:gap-0">
        <div className="w-4/5 mobile:w-full">
          <div className="top-line">
            <h3 className="activity-h3">체험 설명</h3>
            <p>{activityData.description}</p>
          </div>
          <div className="top-line">
            <KakaoMap address={activityData.address} />
            <Location address={activityData.address} />
          </div>
          <div className="top-line">
            <h3 className="activity-h3">후기</h3>
            {reviewData && reviewData.totalCount > 0 ? (
              <>
                <ReviewList
                  totalCount={reviewData.totalCount}
                  averageRating={reviewData.averageRating}
                  reviews={reviewData.reviews}
                  nickname={userData?.nickname || '익명 사용자'}
                  profileImageUrl={
                    userData?.profileImageUrl ||
                    '/assets/icons/icon_profile.svg'
                  }
                />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  handlePageChange={setPage}
                />
              </>
            ) : (
              <p>작성된 후기가 없습니다.</p>
            )}
          </div>
        </div>
        <div className="relative mt-10">
          <div className="sticky top-24 z-10 tablet:min-w-[251px]">
            <ReservationCard />
          </div>
        </div>
      </div>
    </>
  );
}
