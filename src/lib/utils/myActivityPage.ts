import { AVAILABLE_TIMES } from '@/constants/myActivityPage';
import { Schedule } from '@/types/activityTypes';

// 기존에 추가된 일정과 새 일정이 중복되는지 확인
export const checkDuplication = (schedules: Schedule[], schedule: Schedule) => {
  const startIdx = AVAILABLE_TIMES.indexOf(schedule.startTime);
  const endIdx = AVAILABLE_TIMES.indexOf(schedule.endTime);

  const overlaps = schedules.filter((s) => {
    const si = AVAILABLE_TIMES.indexOf(s.startTime);
    const ei = AVAILABLE_TIMES.indexOf(s.endTime);

    const isSameDate = s.date === schedule.date;
    const doesTimeOverlap =
      (si <= startIdx && startIdx < ei) || (si < endIdx && endIdx <= ei);

    return isSameDate && doesTimeOverlap;
  });

  // 겹치는 일정이 존재하면 중복
  return !!overlaps.length;
};
