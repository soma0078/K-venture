import { useRouter } from 'next/router';

import CustomKebab from '@/components/activity/CustomKebab';
import ImageGallery from '@/components/activity/ImageGallery';
import KakaoMap from '@/components/activity/KakaoMap';
import Location from '@/components/activity/Location';
import { ReviewRating } from '@/components/activity/Review';
import useFetchData from '@/hooks/useFetchData';
import { getActivity } from '@/lib/apis/getApis';
import { getUserData } from '@/lib/apis/userApis';
import { ActivityResponse } from '@/types/activityTypes';

export default function ActivityPage() {
  const router = useRouter();
  const activityId = Number(router.query.id);

  const { data: activityData } = useFetchData<ActivityResponse>(
    ['activity', activityId],
    () => getActivity(activityId),
    {
      enabled: !!activityId,
    },
  );
  const { data: userData, isLoading } = useFetchData(['user'], getUserData, {});

  if (isLoading) return <div>로딩중</div>;
  if (!activityData) return <div>존재하지 않는 체험입니다.</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <span>{activityData.category}</span>
          <h2 className="mb-4 mt-2 text-kv-3xl font-kv-bold mobile:text-kv-2xl">
            {activityData.title}
          </h2>
          <div className="flex items-center gap-3">
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
      <div className="flex justify-between gap-6">
        <div className="w-4/5">
          <div className="top-line">
            <h3 className="activity-h3">체험 설명</h3>
            <p>{activityData.description}</p>
          </div>
          <div className="top-line">
            <KakaoMap address={activityData.address} />
            <Location address={activityData.address} />
          </div>
          <div className="top-line">
            <div className="h-96 bg-slate-50">{/* TODO 후기 컴포넌트 */}</div>
          </div>
        </div>
        <div className="h-[746px] min-w-96 bg-slate-50">
          {/* TODO 예약 카드 컴포넌트 */}
        </div>
      </div>
    </>
  );
}
