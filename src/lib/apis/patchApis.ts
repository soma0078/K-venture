import { AxiosResponse } from 'axios';

import { UpdateActivityParams } from '@/types/page/myActivityEditPageTypes';
import { PatchReservationStatusParamsType } from '@/types/page/ReservationDashboardPageTypes';

import instance from './axios';

// 유저 정보 수정 요청 함수
export const updateUserData = async (
  formData: Partial<{
    nickname: string;
    newPassword: string;
    profileImageUrl: string;
  }>,
) => {
  const res = await instance.patch('/users/me', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const cancelReservation = async (reservationId: number) => {
  const url = `/my-reservations/${reservationId}`;
  return await instance.patch(url, { status: 'canceled' });
};

// 예약 신청에 대해 승인, 거절 업데이트
export const patchReservationStatus = async ({
  activityId,
  reservationId,
  status,
}: PatchReservationStatusParamsType) => {
  return await instance.patch(
    `my-activities/${activityId}/reservations/${reservationId}`,
    { status },
  );
};

//체험 데이터 업데이트
export const updateActivity = async (
  activityId: number,
  updateData: UpdateActivityParams,
): Promise<AxiosResponse> => {
  try {
    const response = await instance.patch(
      `/my-activities/${activityId}`,
      updateData,
    );
    return response;
  } catch (error) {
    console.error('Failed to update activity:', error);
    throw error;
  }
};
