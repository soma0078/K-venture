import { useAtom, useSetAtom } from 'jotai';
import { ReactNode, useState } from 'react';
import { CalendarProps, TileArgs } from 'react-calendar';

import useFetchData from '@/hooks/useFetchData';
import useResponsive from '@/hooks/useResponsive';
import { getReservationStatus } from '@/lib/apis/getApis';
import { formatDateToYMD } from '@/lib/utils/formatDate';
import {
  calendarChipAtom,
  dailyReservationModalAtom,
  reservationDashboardQueryParamsAtom,
} from '@/state/reservationDashboardAtom';

interface useReservationCalendarProps {
  onOpen: () => void;
}

type ValidStatus = 'pending' | 'confirmed';

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
  const [dailyModalState, setDailyModalState] = useAtom(
    dailyReservationModalAtom,
  );
  const [calendarChip] = useAtom(calendarChipAtom);
  const { isMobile } = useResponsive();

  const updateStateForDate = (date: Date, status: ValidStatus) => {
    setValue(date);
    setDailyModalState((prev) => ({
      ...prev,
      date: formatDateToYMD(new Date(date)),
      status: status || prev.status,
    }));
  };

  const handleDateSelection = (date: Date, status: ValidStatus) => {
    updateStateForDate(date, status);
    onOpen();
  };

  const onDateChange: CalendarProps['onChange'] = (nextValue, { target }) => {
    if (!(nextValue instanceof Date)) return;

    if (
      isMobile &&
      target instanceof HTMLButtonElement &&
      (target.querySelector('.reserve-chip') ||
        target.querySelector('.approve-chip'))
    ) {
      handleDateSelection(nextValue, 'pending');
    }

    if (target instanceof HTMLDivElement) {
      const status = target.dataset.status;

      if (status === 'completed') return;

      if (status === 'pending' || status === 'confirmed') {
        handleDateSelection(nextValue, status);
      }
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

  const { data: reservationStatus } = useFetchData(
    ['reservationStatus', dailyModalState.activityId, dailyModalState.date],
    () =>
      getReservationStatus(dailyModalState.activityId, dailyModalState.date),
    {
      enabled: !!dailyModalState.activityId && !!dailyModalState.date,
    },
  );

  return {
    tileContent,
    tileClassName,
    onDateChange,
    onMonthChange,
    value,
    reservationStatus,
  };
}
