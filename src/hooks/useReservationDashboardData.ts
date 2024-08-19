import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { INITIAL_DAILY_RESERVATION_MODAL_STATE } from '@/constants/dailyReservationModalConstants';
import useFetchData from '@/hooks/useFetchData';
import useResponsive from '@/hooks/useResponsive';
import useScrollLock from '@/hooks/useScrollLock';
import { getMyActivities, getReservationDashboard } from '@/lib/apis/getApis';
import {
  calendarChipAtom,
  dailyReservationModalAtom,
  reservationDashboardQueryParamsAtom,
} from '@/state/reservationDashboardAtom';
import {
  AvailableValues,
  MyActivity,
  ReservationDashboardResponse,
} from '@/types/page/ReservationDashboardPageTypes';

const useReservationDashboardData = () => {
  const { activityId, year, month } = useAtomValue(
    reservationDashboardQueryParamsAtom,
  );
  const setCalendarChip = useSetAtom(calendarChipAtom);
  const [availableActivities, setAvailableActivities] = useState<
    AvailableValues[]
  >([]);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const { isMobile } = useResponsive();
  const setDailyModalState = useSetAtom(dailyReservationModalAtom);

  useScrollLock({ isOpen: isOpenInfo, additionalCondition: isMobile });

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

  const handleCloseClick = () => {
    setIsOpenInfo(false);
    setDailyModalState((prev) => ({
      ...prev,
      date: INITIAL_DAILY_RESERVATION_MODAL_STATE.date,
      scheduleId: INITIAL_DAILY_RESERVATION_MODAL_STATE.scheduleId,
      status: INITIAL_DAILY_RESERVATION_MODAL_STATE.status,
    }));
  };

  const handleOpenClick = () => {
    setIsOpenInfo(true);
  };

  return { availableActivities, isOpenInfo, handleCloseClick, handleOpenClick };
};

export default useReservationDashboardData;
