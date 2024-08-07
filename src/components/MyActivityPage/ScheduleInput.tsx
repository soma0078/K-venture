import Image from 'next/image';
import { useState } from 'react';

import DatePicker from '@/components/common/DatePicker/DatePicker';
import ValueDropdown from '@/components/common/Dropdown/ValueDropdown';
import { AVAILABLE_TIMES } from '@/constants/myActivityPage';
import useDropdown from '@/hooks/useDropdown';
import { convertAPItoSelected } from '@/lib/utils/formatDate';
import { Schedule } from '@/types/activityTypes';

interface ScheduleInputProps {
  onClickButton: (schedule: Schedule) => boolean;
}

export default function ScheduleInput({ onClickButton }: ScheduleInputProps) {
  const [date, setDate] = useState('');
  const startTime = useDropdown('');
  const endTime = useDropdown('');

  const startIdx = endTime.value
    ? AVAILABLE_TIMES.indexOf(endTime.value)
    : AVAILABLE_TIMES.length;
  const endIdx = startTime.value
    ? AVAILABLE_TIMES.indexOf(startTime.value) + 1
    : 0;

  // 값 초기화
  const initialize = () => {
    setDate(''); // TODO: 표시되는 값은 초기화되지 않음
    startTime.handleReset();
    endTime.handleReset();
  };

  const handleClickButton = () => {
    const schedule = {
      date,
      startTime: startTime.value,
      endTime: endTime.value,
    };
    if (onClickButton(schedule)) {
      initialize();
    }
  };

  return (
    <div className="schedule-my-act">
      {/* 날짜 */}
      <div className="size-my-act-date mr-[2px] flex flex-col gap-2.5 pc:mr-0 tablet:mr-0">
        <p className="label-my-act-schedule">날짜</p>
        <DatePicker
          className="input-my-act"
          variant="popup"
          onClick={(value) => setDate(convertAPItoSelected(value))}
        />
      </div>

      {/* 시간 */}
      <div className="times-my-act text-kv-md pc:text-kv-lg tablet:text-kv-lg">
        <div className="size-my-act-time flex flex-col gap-2.5">
          <p className="label-my-act-schedule">시작 시간</p>
          <ValueDropdown
            placeholder={'0:00'}
            availableValues={AVAILABLE_TIMES.slice(0, startIdx)}
            {...startTime}
          />
        </div>
        <span className="my-auto hidden pt-9 text-kv-xl font-bold pc:inline pc:pt-[42px] tablet:pt-[42px]">
          ~
        </span>
        <div className="size-my-act-time flex flex-col gap-2.5">
          <p className="label-my-act-schedule">종료 시간</p>
          <ValueDropdown
            placeholder={'0:00'}
            availableValues={AVAILABLE_TIMES.slice(
              endIdx,
              AVAILABLE_TIMES.length,
            )}
            {...endTime}
          />
        </div>
      </div>

      {/* 추가버튼 */}
      <button
        className="relative mt-9 size-11 hover:brightness-95 active:brightness-90 disabled:brightness-75 pc:mt-[42px] pc:size-14 tablet:mt-[42px] tablet:size-14"
        type="button"
        disabled={!date || !startTime.value || !endTime.value}
        onClick={handleClickButton}
      >
        <Image src="/assets/icons/icon_plus_blue.svg" alt="날짜 추가" fill />
      </button>
    </div>
  );
}
