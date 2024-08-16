import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { getMyActivities, getReservationDashboard } from '@/lib/apis/getApis';
import {
  calendarChipAtom,
  reservationDashboardQueryParamsAtom,
} from '@/state/reservationDashboardAtom';
import {
  AvailableValues,
  MyActivity,
  ReservationDashboardResponse,
} from '@/types/page/ReservationDashboardPageTypes';

import useFetchData from './useFetchData';

const useReservationDashboardData = () => {
  const { activityId, year, month } = useAtomValue(
    reservationDashboardQueryParamsAtom,
  );
  const setCalendarChip = useSetAtom(calendarChipAtom);
  const [availableActivities, setAvailableActivities] = useState<
    AvailableValues[]
  >([]);

  // GET 등록한 체험 전체 데이터
  const { data: myActivitiesData } = useFetchData(
    ['myActivities'],
    getMyActivities,
    {
      staleTime: 0,
      cacheTime: 0,
    },
  );

  // 드롭다운 데이터 추출
  useEffect(() => {
    if (myActivitiesData?.activities) {
      const formattedActivities: AvailableValues[] =
        myActivitiesData.activities.map((activity: MyActivity) => ({
          id: activity.id,
          title: activity.title,
        }));
      setAvailableActivities(formattedActivities);
    }
  }, [myActivitiesData]);

  // GET 칩 데이터
  const { data: reservationDashboardData } = useFetchData<
    ReservationDashboardResponse[]
  >(
    ['reservationDashboard', activityId, year, month],
    () => getReservationDashboard(activityId, year, month),
    {
      enabled: !!activityId,
      staleTime: 0,
      cacheTime: 0,
    },
  );

  // 칩 데이터 업데이트
  useEffect(() => {
    if (reservationDashboardData) {
      setCalendarChip(reservationDashboardData);
    }
  }, [reservationDashboardData]);

  return { availableActivities };
};

export default useReservationDashboardData;
