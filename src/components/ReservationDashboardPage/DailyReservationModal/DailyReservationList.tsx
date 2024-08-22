import { useAtomValue } from 'jotai';
import React from 'react';

import Button from '@/components/common/Button';
import InfiniteScrollHint from '@/components/common/InfiniteScrollHint';
import useDailyReservationListInfinite from '@/hooks/useDailyReservationListInfinite';
import { usePatchReservationStatus } from '@/hooks/useUpdateReservationStatus';
import { dailyReservationModalAtom } from '@/state/reservationDashboardAtom';
import { PatchReservationStatusParamsType } from '@/types/page/ReservationDashboardPageTypes';

export default function DailyReservationList() {
  const { activityId, status: modalStatus } = useAtomValue(
    dailyReservationModalAtom,
  );
  const patchReservationStatus = usePatchReservationStatus();
  const { reservationList, ref, hasNextPage, isFetchingNextPage, refetch } =
    useDailyReservationListInfinite();

  const handleReservationActionClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    const { status, id: reservationId } = currentTarget.dataset;

    const isInvalidReservationAction =
      !status ||
      !reservationId ||
      !activityId ||
      patchReservationStatus.isPending;

    if (isInvalidReservationAction) return;

    const params: PatchReservationStatusParamsType = {
      status: status as 'confirmed' | 'declined',
      reservationId,
      activityId,
    };

    patchReservationStatus.mutate(params, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <div className="mx-auto mt-[27px] h-[294px] w-full min-w-[332px] px-[16px]">
      <p className="daily-modal-sub-title">예약 내역</p>
      <div className="h-[248px] overflow-auto scrollbar-none-custom">
        {reservationList?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.data.reservations.map(
              ({ nickname, headCount, id }, index) => {
                const isLastItem =
                  pageIndex === reservationList.pages.length - 1 &&
                  index === page.data.reservations.length - 1;
                return (
                  <div
                    className="mb-[16px] flex h-[116px] w-full flex-col gap-[6px] rounded border px-[16px] pt-[16px]"
                    key={index}
                    ref={isLastItem ? ref : undefined}
                  >
                    <div className="daily-modal-list-content">
                      <span className="daily-modal-list-sub-title">닉네임</span>
                      {nickname}
                    </div>
                    <div className="daily-modal-list-content">
                      <span className="daily-modal-list-sub-title">인원</span>
                      {headCount}명
                    </div>
                    <div className="flex h-[38px] items-center justify-end gap-[6px]">
                      {modalStatus === 'pending' && (
                        <>
                          <Button
                            type="button"
                            data-status="confirmed"
                            data-id={id}
                            onClick={handleReservationActionClick}
                            className="daily-modal-button-base bg-kv-primary-blue text-white"
                          >
                            승인하기
                          </Button>
                          <Button
                            type="button"
                            data-status="declined"
                            data-id={id}
                            onClick={handleReservationActionClick}
                            className="daily-modal-button-base border-kv-primary-blue text-kv-primary-blue"
                          >
                            거절하기
                          </Button>
                        </>
                      )}
                      {modalStatus === 'confirmed' && (
                        <span
                          className={`reservation-list-badge-base bg-kv-orange-light`}
                        >
                          예약 승인
                        </span>
                      )}
                      {modalStatus === 'declined' && (
                        <span
                          className={`reservation-list-badge-base bg-kv-red-light`}
                        >
                          예약 거절
                        </span>
                      )}
                    </div>
                  </div>
                );
              },
            )}
          </React.Fragment>
        ))}
      </div>

      {isFetchingNextPage ? (
        <div className="align-center">Loading...</div>
      ) : (
        hasNextPage && <InfiniteScrollHint hasNextPage={hasNextPage} />
      )}
    </div>
  );
}
