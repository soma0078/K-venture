import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function ActivityPageSkeleton() {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#eee" borderRadius={10}>
      <Skeleton width={160} height={26} />
      <Skeleton width={'50%'} height={40} className="mb-4 mt-4" />
      <Skeleton width={270} height={26} />

      <div className="mb-6 mt-6">
        <Skeleton className="h-[310px] pc:h-[540px]" />
      </div>

      <div className="flex justify-between gap-4">
        <div className="w-full pc:w-4/5">
          <Skeleton width={74} height={30} className="mb-4" />
          <Skeleton height={160} />

          <div className="mb-10 mt-10">
            <Skeleton height={450} className="mb-2" />
            <Skeleton width={160} height={26} />
          </div>

          <div className="mt-10">
            <Skeleton width={32} height={30} className="mb-6" />
            <div className="flex gap-4">
              <Skeleton width={75} height={60} />
              <div className="mb-6">
                <Skeleton width={67} height={26} />
                <Skeleton width={96} height={24} />
              </div>
            </div>
            <div className="flex gap-4">
              <Skeleton width={45} height={45} borderRadius={100} />
              <div className="w-full">
                <Skeleton width={137} height={26} className="mb-2" />
                <Skeleton height={78} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[384px] tablet:w-[251px] mobile:hidden">
          <Skeleton className="h-[746px] tablet:h-[431px]" />
        </div>
      </div>
    </SkeletonTheme>
  );
}
