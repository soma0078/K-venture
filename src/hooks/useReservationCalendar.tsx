import { useAtom, useSetAtom } from 'jotai';
import { ReactNode, useState } from 'react';
import { CalendarProps, TileArgs } from 'react-calendar';

import { formatDateToYMD } from '@/lib/utils/formatDate';
import {
  calendarChipAtom,
  dailyReservationModalAtom,
  reservationDashboardQueryParamsAtom,
} from '@/state/reservationDashboardAtom';

interface useReservationCalendarProps {
  onOpen: () => void;
}

export default function useReservationCalendar({
  onOpen,
}: useReservationCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [value, setValue] = useState<CalendarProps['value']>(new Date());
  const setQueryParamsState = useSetAtom(reservationDashboardQueryParamsAtom);
  const setDailyModalState = useSetAtom(dailyReservationModalAtom);
  const [calendarChip] = useAtom(calendarChipAtom);

  const onDateChange: CalendarProps['onChange'] = (nextValue) => {
    if (nextValue instanceof Date) {
      setValue(nextValue);
      setDailyModalState((prev) => ({
        ...prev,
        date: formatDateToYMD(new Date(nextValue.toString())),
      }));
      onOpen();
    }
  };

  const onMonthChange: CalendarProps['onActiveStartDateChange'] = ({
    activeStartDate,
  }) => {
    if (activeStartDate instanceof Date) {
      setCurrentMonth(activeStartDate.getMonth() + 1);
      const month = activeStartDate?.getMonth() + 1;
      setQueryParamsState((prev) => ({
        ...prev,
        month: month.toString().padStart(2, '0'),
        year: activeStartDate?.getFullYear().toString(),
      }));
    }
  };

  // 이전달 다음달 현재달 클래스 전달하는 함수
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const tileMonth = date.getMonth() + 1;
      if (tileMonth < currentMonth) {
        return 'previous-month'; // 이전 달
      } else if (tileMonth > currentMonth) {
        return 'next-month'; // 다음 달
      }
    }
    return 'text-kv-gray-700'; // 현재 달
  };

  // 칩 랜더링
  const tileContent = ({ date, view }: TileArgs): ReactNode => {
    if (view !== 'month') return null;

    const formattedDate = formatDateToYMD(date);
    const chipData = calendarChip.find((chip) => chip.date === formattedDate);

    if (!chipData) return null;

    const { completed, confirmed, pending } = chipData.reservations;
    return (
      <div className="chip-container">
        {completed !== 0 && (
          <div className="reservation-chip complete-chip">완료 {completed}</div>
        )}
        {confirmed !== 0 && (
          <div className="reservation-chip reserve-chip">예약 {confirmed}</div>
        )}
        {pending !== 0 && (
          <div className="reservation-chip approve-chip">승인 {pending}</div>
        )}
        <div
          className={`color-dot ${completed === 0 ? 'bg-kv-primary-blue' : 'bg-kv-gray-900'}`}
        />
      </div>
    );
  };

  return {
    tileContent,
    tileClassName,
    onDateChange,
    onMonthChange,
    value,
  };
}
