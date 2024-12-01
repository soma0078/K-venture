import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import ArrowIcon from '@/assets/icons/icon_arrow_down.svg';
import {
  INITIAL_DAILY_RESERVATION_MODAL_STATE,
  INITIAL_RESERVATION_DATE_DROPDOWN_STATE,
} from '@/constants/dailyReservationModalConstants';
import { dailyReservationModalAtom } from '@/state/reservationDashboardAtom';
import { ReservationStatusResponse } from '@/types/get/ReservationDashboardPageGetTypes';

interface DailyReservationDateDropdownProps {
  reservationStatus: ReservationStatusResponse[];
}

export default function DailyReservationDateDropdown({
  reservationStatus,
}: DailyReservationDateDropdownProps) {
  const [selected, setSelected] = useState(
    INITIAL_RESERVATION_DATE_DROPDOWN_STATE,
  );
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
    if (
      dailyModalState.scheduleId ===
      INITIAL_DAILY_RESERVATION_MODAL_STATE.scheduleId
    ) {
      setSelected(INITIAL_RESERVATION_DATE_DROPDOWN_STATE);
    }
  }, [dailyModalState.status]);

  return (
    <div className="mx-auto mt-[27px] h-[130px] w-full min-w-[332px] px-[16px]">
      <p className="daily-modal-sub-title">예약 날짜</p>
      <p className="text-kv-xl font-kv-regular">{dailyModalState.date}</p>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
        type="button"
        className="flex h-[56px] w-full items-center justify-between rounded border border-kv-black px-[16px]"
      >
        <p>{selected.value}</p>
        <ArrowIcon
          className={`translate size-[28px] ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <ul className="relative z-10 mt-1 max-h-[220px] overflow-auto rounded shadow-md scrollbar-custom">
        {isOpen &&
          reservationStatus
            .filter(({ count }) => count[dailyModalState.status] > 0)
            .map(({ startTime, endTime, scheduleId }, idx) => {
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
