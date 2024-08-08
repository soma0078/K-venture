import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { createReservation } from '@/lib/apis/postApis';
import { ReservationStateType } from '@/types/activityDetailPageTypes';

export const useReservation = () => {
  const router = useRouter();
  const activityId = router.query.id;

  const mutation = useMutation({
    mutationFn: (reservationState: ReservationStateType) =>
      createReservation(Number(activityId), {
        scheduleId: reservationState.scheduleId,
        headCount: reservationState.headCount,
      }),
    onSettled: () => {
      setTimeout(() => {
        mutation.reset();
      }, 1000);
    },
  });

  const submitReservation = (reservationState: ReservationStateType) => {
    if (activityId === undefined) return;
    mutation.mutate(reservationState);
  };

  return {
    submitReservation,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
};
