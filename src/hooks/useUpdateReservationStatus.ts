import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { patchReservationStatus } from '@/lib/apis/patchApis';
import { dailyReservationModalAtom } from '@/state/reservationDashboardAtom';
import { PatchReservationStatusParamsType } from '@/types/page/ReservationDashboardPageTypes';

export const usePatchReservationStatus = () => {
  const queryClient = useQueryClient();
  const dailyModalState = useAtomValue(dailyReservationModalAtom);

  return useMutation({
    mutationFn: ({
      activityId,
      status,
      reservationId,
    }: PatchReservationStatusParamsType) =>
      patchReservationStatus({ activityId, status, reservationId }),
    // Patch 작업(예약 상태 변경)이 성공적으로 완료되면,
    // 관련된 쿼리들(예약 상태, 상세 정보, 대시보드)을 무효화합니다.
    // 무효화된 쿼리들은 React Query에 의해 자동으로 리패칭(다시 데이터 요청)됩니다.
    // 새로운 데이터가 도착하면 React Query가 관련 컴포넌트들을 자동으로 리렌더링합니다.
    // 결과적으로 UI가 최신 데이터로 업데이트됩니다.
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reservationDashboard', dailyModalState.activityId],
      });

      queryClient.invalidateQueries({
        queryKey: [
          'reservationStatus',
          dailyModalState.activityId,
          dailyModalState.date,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ['reservationDetails', dailyModalState.scheduleId],
      });
    },
  });
};
