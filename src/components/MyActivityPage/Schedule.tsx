import Image from 'next/image';

import { Schedule as ScheduleType } from '@/types/activityTypes';

interface DateProps {
  schedule: ScheduleType;
  onClickDelete: () => void;
}

/* NOTE: 날짜를 확인/제거할 수 있는 컴포넌트
 * onClickDelete: 날짜 제거를 반영하는 함수
 */
export default function Schedule({ schedule, onClickDelete }: DateProps) {
  return (
    <div className="schedule-my-act">
      {/* 날짜 */}
      <div className="input-my-act size-my-act-date">{schedule.date}</div>

      {/* 시간 */}
      <div className="times-my-act">
        <div className="input-my-act size-my-act-time">
          {schedule.startTime}
        </div>
        <span className="my-auto hidden text-kv-xl font-bold pc:inline">~</span>
        <div className="input-my-act size-my-act-time">{schedule.endTime}</div>
      </div>

      {/* 삭제버튼 */}
      <button
        className="relative size-11 hover:brightness-95 active:brightness-90 pc:size-14 tablet:size-14"
        type="button"
        onClick={onClickDelete}
      >
        <Image src="/assets/icons/icon_minus.svg" alt="날짜 제거" fill />
      </button>
    </div>
  );
}
