import { formatDateToYMD } from '@/lib/utils/formatDate';
import { DailyReservationModalType } from '@/types/page/ReservationDashboardPageTypes';

export const INITIAL_DAILY_RESERVATION_MODAL_STATE: DailyReservationModalType =
  {
    activityId: 0,
    date: formatDateToYMD(new Date()),
    status: 'pending',
    scheduleId: 0,
  };
