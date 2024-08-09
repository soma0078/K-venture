import { useEffect, useState } from 'react';

import { getMyActivities } from '@/lib/apis/getApis';
import {
  AvailableValues,
  MyActivity,
  ReservationDashboardResponse,
} from '@/types/page/ReservationDashboardPageTypes';

import useFetchData from './useFetchData';

const useReservationDashboardData = () => {
  // 달력 상태 데이터
  const [dashboardItems, setDashboardItems] =
    useState<ReservationDashboardResponse>();
  //드롭다운 상태데이터
  const [availableValues, setAvailableValues] = useState<AvailableValues[]>([]);
  const { data } = useFetchData(['availableValues'], getMyActivities, {
    staleTime: 0,
    cacheTime: 0,
  });

  // (드롭다운)내 체험 리스트 조회
  useEffect(() => {
    if (data?.activities) {
      const values: AvailableValues[] = data.activities.map(
        (activity: MyActivity) => ({
          id: activity.id,
          title: activity.title,
        }),
      );
      setAvailableValues(values);
    }
  }, [data]);

  // (달력) 내 체험 월별 등록 현황
  // TODO 현재 id까지 수집한 상황 year, month까지 데이터 입력 받아서 요청 보내기
  // const { data: reservationData, refetch } = useFetchData(
  //   ['dashboardItems', dropdown.value],
  //   () => getReservationDashboard(dropdown.id),
  //   {
  //     enabled: false, // 자동으로 실행되지 않도록 설정
  //     staleTime: 0,
  //     cacheTime: 0,
  //   },
  // );

  // useEffect(() => {
  //   if (reservationData) {
  //     setDashboardItems(reservationData);
  //   }
  // }, [reservationData]);

  // useEffect(() => {
  //   refetch();
  // }, [dropdown.id]);

  return { availableValues, dashboardItems };
};

export default useReservationDashboardData;
