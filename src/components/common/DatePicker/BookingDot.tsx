import React from 'react';

import { formatDateToYMD } from '@/lib/utils/formatDate';
import { ReservationStateType } from '@/types/activityDetailPageTypes';

interface BookingDotProps {
  day: number;
  date: Date;
  reservationState?: ReservationStateType;
}

export const BookingDot: React.FC<BookingDotProps> = ({
  day,
  date,
  reservationState,
}) => {
  const getReservationDays = () => {
    const schedules = reservationState?.schedules || [];
    return schedules.map((schedule) => schedule.date);
  };

  const reservationDays = getReservationDays();
  const matchedDay = reservationDays.includes(String(formatDateToYMD(date)));

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      {matchedDay && (
        <div className="absolute top-[1px] h-1 w-1 rounded-full bg-kv-primary-blue" />
      )}
      <span>{day}</span>
    </div>
  );
};
