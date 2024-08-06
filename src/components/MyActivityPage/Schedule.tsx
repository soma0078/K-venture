import Image from 'next/image';

import { convertAPItoSelected } from '@/lib/utils/formatDate';
import { Schedule as ScheduleType } from '@/types/activityTypes';

interface DateProps {
  schedule: ScheduleType;
  idx: number;
  onClickDelete: (idx: number) => void;
}

/* NOTE: 날짜를 확인/제거할 수 있는 컴포넌트
 * onClickDelete: 날짜 제거를 반영하는 함수
 */
export default function Schedule({ schedule, idx, onClickDelete }: DateProps) {
  return (
    <div className="flex h-11 gap-1 pc:h-14 pc:gap-5 tablet:h-14 tablet:gap-2">
      {/* 날짜 */}
      <div className="input-my-act w-[130px] pc:w-[380px] tablet:w-[150px]">
        {convertAPItoSelected(schedule.date)}
      </div>

      {/* 시간 */}
      <div className="flex h-full gap-1 pc:gap-3 tablet:gap-[5px]">
        <div className="input-my-act w-[80px] pc:w-[140px] tablet:w-[104px]">
          {schedule.startTime}
        </div>
        <span className="my-auto hidden text-kv-xl font-bold pc:inline">~</span>
        <div className="input-my-act w-[80px] pc:w-[140px] tablet:w-[104px]">
          {schedule.endTime}
        </div>
      </div>

      {/* 삭제버튼 */}
      <button
        className="relative size-11 hover:brightness-95 active:brightness-90 pc:size-14 tablet:size-14"
        type="button"
        onClick={() => onClickDelete(idx)}
      >
        <Image src="/assets/icons/icon_minus.svg" alt="날짜 제거" fill />
      </button>
    </div>
  );
}
