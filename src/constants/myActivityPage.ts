import { IMAGE_TYPES } from '@/types/page/myActivityPageTypes';

export const MAX_IMG_LENGTH = {
  [IMAGE_TYPES.BANNER]: 1,
  [IMAGE_TYPES.SUB]: 4,
} as const;

// 선택 가능한 시간 목록 (일단 :00, :30만 가능하도록 함)
const hours = new Array(24).fill(0).map((_, i) => i);
export const AVAILABLE_TIMES = hours.flatMap((hour) => [
  `${hour}:00`,
  `${hour}:30`,
]);
