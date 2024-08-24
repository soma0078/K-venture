import classNames from 'classnames';
import { isSameDay } from 'date-fns';
import React, { useState } from 'react';

interface DayMarkerProps {
  dayOfMonth: number;
  date: Date;
  day: Date;
  selectedDate: Date | null;
}

export default function DayMarker({ day, date }: DayMarkerProps) {
  const [startDate, setStartDate] = useState(new Date());
  const hasReservation = isSameDay(startDate, 23);

  const tooltipText = `Tooltip for date: ${date}`;
  return (
    <span title={tooltipText}>
      <span>{hasReservation ? 'v' : `${date}`}</span>
    </span>
  );
}
