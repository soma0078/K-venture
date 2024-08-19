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

// calendar chip을 구성하는 컴포넌트들
const CompletedChip = () => (
  <div className="reservation-chip complete-chip" data-status="completed">
    완료
  </div>
);

const ConfirmedChip = ({ count }: { count: number }) => (
  <div className="reservation-chip approve-chip" data-status="confirmed">
    승인 {count}
  </div>
);

const PendingChip = ({ count }: { count: number }) => (
  <div className="reservation-chip reserve-chip" data-status="pending">
    예약 {count}
  </div>
);

const ColorDot = ({ completed }: { completed: number }) => (
  <div
    className={`color-dot ${completed === 0 ? 'bg-kv-primary-blue' : 'completeStatus'}`}
  />
);

const ReservationChips = ({
  completed,
  confirmed,
  pending,
}: {
  completed: number;
  confirmed: number;
  pending: number;
}) => {
  if (completed !== 0) {
    return <CompletedChip />;
  }

  return (
    <>
      {confirmed !== 0 && <ConfirmedChip count={confirmed} />}
      {pending !== 0 && <PendingChip count={pending} />}
    </>
  );
};

export default function useReservationCalendar({
  onOpen,
}: useReservationCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [value, setValue] = useState<CalendarProps['value']>(new Date());
  const setQueryParamsState = useSetAtom(reservationDashboardQueryParamsAtom);
  const setDailyModalState = useSetAtom(dailyReservationModalAtom);
  const [calendarChip] = useAtom(calendarChipAtom);

  const onDateChange: CalendarProps['onChange'] = (nextValue, { target }) => {
    if (nextValue instanceof Date && target instanceof HTMLDivElement) {
      if (target.dataset.status === 'completed') return;

      setValue(nextValue);
      setDailyModalState((prev) => ({
        ...prev,
        date: formatDateToYMD(new Date(nextValue.toString())),
        status:
          (target.dataset.status as 'pending' | 'confirmed') || prev.status,
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
        <ReservationChips
          completed={completed}
          confirmed={confirmed}
          pending={pending}
        />
        <ColorDot completed={completed} />
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
