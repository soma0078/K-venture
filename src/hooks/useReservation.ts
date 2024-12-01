import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useModal } from '@/components/common/Modal';
import { createReservation } from '@/lib/apis/postApis';
import {
  CreateReservationErrorType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';

export const useReservation = () => {
  const router = useRouter();
  const activityId = router.query.id;
  const { modalProps, openModal } = useModal();

  const mutation = useMutation({
    mutationFn: (reservationState: ReservationStateType) =>
      createReservation(Number(activityId), {
        scheduleId: reservationState.scheduleId,
        headCount: reservationState.headCount,
      }),
    onSuccess() {
      openModal('alert', '예약이 완료되었습니다.');
    },
    onError(error: CreateReservationErrorType) {
      if (error.status !== 401) {
        openModal('alert', `${error.message}`);
      }

      if (error.status === 401) {
        openModal('alert', '예약 신청은 로그인 후 가능합니다.');
      }
    },
  });

  const submitReservation = (reservationState: ReservationStateType) => {
    if (activityId === undefined) return;
    mutation.mutate(reservationState);
  };

  return {
    submitReservation,
    modalProps,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
};
