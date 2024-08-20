import { Schedule as ScheduleType } from '@/types/activityTypes';

import Schedule from './Schedule';
import ScheduleInput from './ScheduleInput';

interface ScheduleListProps {
  schedules: ScheduleType[];
  onClickAdd: (schedule: ScheduleType) => boolean;
  onClickDelete: (idx: number) => void;
}

export default function ScheduleList({
  schedules,
  onClickAdd,
  onClickDelete,
}: ScheduleListProps) {
  return (
    <div>
      <ScheduleInput onClickButton={onClickAdd} />
      {schedules.length > 0 && (
        <div className="my-4 h-0 w-full border border-kv-gray-300 pc:my-[21px]"></div>
      )}
      <ul className="flex flex-col gap-4 pc:gap-[21px]">
        {schedules.map((schedule, idx) => (
          <Schedule
            schedule={schedule}
            onClickDelete={() => onClickDelete(idx)}
          />
        ))}
      </ul>
    </div>
  );
}
