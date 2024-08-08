import { ReservationStateType } from '@/types/activityDetailPageTypes';

export function isReservationValid(
  reservationState: ReservationStateType,
): boolean {
  return !!(
    reservationState.date &&
    reservationState.startTime &&
    reservationState.endTime &&
    reservationState.headCount
  );
}
