import { atom } from 'jotai';

import { INITIAL_DAILY_RESERVATION_MODAL_STATE } from '@/constants/dailyReservationModalConstants';
import {
  DailyReservationModalType,
  ReservationDashboardQueryParamsType,
  ReservationDashboardResponse,
} from '@/types/page/ReservationDashboardPageTypes';

// 칩 데이터를 호출 할 때 필요한 쿼리 파라미터
export const reservationDashboardQueryParamsAtom =
  atom<ReservationDashboardQueryParamsType>({
    activityId: 0,
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
  });

// 달력에 표시할 칩 데이터
export const calendarChipAtom = atom<ReservationDashboardResponse[]>([]);

// 예약 정보 모달 데이터
export const dailyReservationModalAtom = atom<DailyReservationModalType>(
  INITIAL_DAILY_RESERVATION_MODAL_STATE,
);
