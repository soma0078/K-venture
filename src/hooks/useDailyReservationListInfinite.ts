import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getReservationDetails } from '@/lib/apis/getApis';
import { dailyReservationModalAtom } from '@/state/reservationDashboardAtom';

const useDailyReservationListInfinite = () => {
  const dailyReservationModalState = useAtomValue(dailyReservationModalAtom);
  const { ref, inView } = useInView({
    threshold: 0.5, // 요소가 50% 이상 보이는 시점을 감지
    delay: 100, // 디바운싱 효과
  });

  const {
    data: reservationList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      'reservationsList',
      dailyReservationModalState.activityId,
      dailyReservationModalState.scheduleId,
      dailyReservationModalState.status,
    ],
    queryFn: ({ pageParam = undefined }) =>
      getReservationDetails({
        activityId: dailyReservationModalState.activityId,
        scheduleId: dailyReservationModalState.scheduleId,
        status: dailyReservationModalState.status,
        cursorId: pageParam as number | undefined,
        size: 4,
      }),
    staleTime: 0,
    gcTime: 0,
    getNextPageParam: (lastPage) => lastPage.data.cursorId || undefined,
    initialPageParam: undefined as number | undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return {
    reservationList,
    ref,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};

export default useDailyReservationListInfinite;
