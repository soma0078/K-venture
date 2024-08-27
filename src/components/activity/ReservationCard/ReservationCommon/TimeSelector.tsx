import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import { RESERVATION_TIMESELECTOR_PLACEHOLDER } from '@/constants/reservationCardConstants';
import {
  CardEventHandlerType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';

interface TimeSelectorProps {
  onClick: CardEventHandlerType;
  reservationState: ReservationStateType;
}

function TimeSelector({ onClick, reservationState }: TimeSelectorProps) {
  const [selectedId, setSelectedId] = useState(0);
  const { date, schedules } = reservationState;

  const filteredSchedules = schedules.filter(
    (schedule) => schedule.date === date,
  );

  const handleTimeClick = (
    startTime: string,
    endTime: string,
    scheduleId: number,
  ) => {
    onClick.handleTimeChange(startTime, endTime, scheduleId);
  };

  useEffect(() => {
    onClick.handleTimeChange('', '', 0);
    setSelectedId(0);
  }, [reservationState.date]);

  return (
    <>
      <p className="text-kv-2lg font-kv-bold">
        {RESERVATION_TIMESELECTOR_PLACEHOLDER.title}
      </p>
      {date === '' ? (
        <p className="mt-[24px] text-center text-kv-lg font-kv-medium text-kv-black">
          {RESERVATION_TIMESELECTOR_PLACEHOLDER.noDate}
        </p>
      ) : (
        <div className="mx-auto mt-[14px] flex w-[248px] flex-wrap gap-3">
          {filteredSchedules.map(({ startTime, endTime, id }) => (
            <Button
              key={id}
              className={`h-[46px] w-[117px] font-kv-medium hover:bg-kv-gray-200 ${
                selectedId === id
                  ? 'bg-kv-primary-blue text-white'
                  : 'border border-kv-primary-blue text-kv-primary-blue'
              }`}
              onClick={() => {
                handleTimeClick(startTime, endTime, id);
                setSelectedId(id);
              }}
            >
              {`${startTime}~${endTime}`}
            </Button>
          ))}
        </div>
      )}
    </>
  );
}

export default TimeSelector;
