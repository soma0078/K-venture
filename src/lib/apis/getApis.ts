import instance from '@/lib/apis/axios';
import { ActivityResponse } from '@/types/activityDetailPageTypes';

// 예약 상세 조회
export const getActivityDetail = async (
  activityId: number,
): Promise<{ data: ActivityResponse }> => {
  const response = await instance.get<ActivityResponse>(
    `/activities/${activityId}`,
  );
  return { data: response.data };
};
