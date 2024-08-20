import { isSameDay } from 'date-fns';
import React from 'react';

interface DayMarkerProps {
  dayOfMonth: number;
  date: Date;
  today: Date;
  selectedDate: Date | null;
}

export default function DayMarker({
  dayOfMonth,
  date,
  today,
  selectedDate,
}: DayMarkerProps): JSX.Element {
  const isToday = isSameDay(date, today);
  const isSelected = selectedDate && isSameDay(date, selectedDate);

  const className =
    `${'w-[34px] h-[32px] justify-center items-center flex rounded-[8px] font-kv-regular'} ${isToday ? 'day-marker-today' : ''} ${isSelected ? 'day-marker-selected' : ''}`.trim();

  return <div className={className}>{dayOfMonth}</div>;
}
