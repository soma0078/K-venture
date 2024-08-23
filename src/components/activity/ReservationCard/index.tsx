import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DesktopReservationCard from '@/components/activity/ReservationCard/DesktopReservationCard';
import MobileReservationCard from '@/components/activity/ReservationCard/MobileReservationCard';
import TabletReservationCard from '@/components/activity/ReservationCard/TabletReservationCard';
import { Modal, useModal } from '@/components/common/Modal';
import { INITIAL_RESERVATION_STATE } from '@/constants/reservationCardConstants';
import { useActivityDetail } from '@/hooks/useActivityDetail';
import { useCardEventHandler } from '@/hooks/useCardEventHandler';
import useResponsive from '@/hooks/useResponsive';
import { ReservationStateType } from '@/types/activityDetailPageTypes';

export default function ReservationCard() {
  const [isClient, setIsClient] = useState(false);
  const [reservationState, setReservationState] =
    useState<ReservationStateType>(INITIAL_RESERVATION_STATE);
  const cardEventHandler = useCardEventHandler(setReservationState);
  const router = useRouter();
  const activityId = Number(router.query.id);
  const { modalProps } = useModal();

  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: activityData, isLoading } = useActivityDetail(activityId, {
    enabled: !!activityId,
  });

  useEffect(() => {
    if (activityData) {
      setReservationState((prevState) => ({
        ...prevState,
        price: activityData.price,
        schedules: activityData.schedules,
      }));
    }
  }, [activityData]);

  if (isLoading || !isClient) return null;

  return (
    <>
      {isMobile && (
        <MobileReservationCard
          reservationState={reservationState}
          onClick={cardEventHandler}
        />
      )}
      {isTablet && (
        <TabletReservationCard
          onClick={cardEventHandler}
          reservationState={reservationState}
        />
      )}
      {isDesktop && (
        <DesktopReservationCard
          onClick={cardEventHandler}
          reservationState={reservationState}
        />
      )}
      <Modal {...modalProps} />
    </>
  );
}
