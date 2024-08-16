import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import ArrowIcon from '@/assets/icons/icon-arrow-down.svg';
import { dailyReservationModalAtom } from '@/state/reservationDashboardAtom';
import { ReservationStatusResponse } from '@/types/get/ReservationDashboardPageGetTypes';

interface DailyReservationDateDropdownProps {
  reservationStatus: ReservationStatusResponse[];
}

export default function DailyReservationDateDropdown({
  reservationStatus,
}: DailyReservationDateDropdownProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState({
    value: `${reservationStatus[0]?.startTime} ~ ${reservationStatus[0]?.endTime}`,
    id: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [dailyModalState, setDailyModalState] = useAtom(
    dailyReservationModalAtom,
  );

  const handleMenuClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLLIElement>) => {
    setSelected({ value: currentTarget.innerText, id: currentTarget.id });
    setDailyModalState((prev) => ({
      ...prev,
      scheduleId: Number(currentTarget.id),
    }));
  };

  useEffect(() => {
    setIsLoading(false);
  }, [reservationStatus]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mx-auto mt-[27px] h-[130px] w-[332px]">
      <p className="sub-title mb-[16px]">예약 날짜</p>
      <p className="text-kv-xl font-kv-regular">{dailyModalState.date}</p>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
        type="button"
        className="flex h-[56px] w-full items-center justify-between rounded-lg border border-kv-black px-[16px]"
      >
        <p>{selected.value}</p>
        <ArrowIcon
          className={`translate size-[28px] ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <ul className="relative z-10 mt-1 max-h-[220px] overflow-auto rounded shadow-md scrollbar-custom">
        {isOpen &&
          reservationStatus.map(({ startTime, endTime, scheduleId }, idx) => {
            const id = scheduleId.toString();
            const isFirst = idx === 0;
            const isLast = idx === reservationStatus.length - 1;
            return (
              <li
                className={`${isFirst ? 'rounded-t-md' : ''} ${isLast ? 'rounded-b-md' : 'border-b'} flex h-[56px] w-full cursor-pointer items-center border border-kv-gray-300 bg-white px-[16px]`}
                key={id}
                id={id}
                onMouseDown={handleMenuClick}
              >
                {startTime} ~ {endTime}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
