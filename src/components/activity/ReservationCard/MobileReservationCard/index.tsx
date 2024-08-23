import React from 'react';

import {
  CardEventHandlerType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';

import ReservationFooterMenu from './ReservationFooterMenu';
import ReservationModal from './ReservationModal';

interface MobileReservationCardProps {
  onClick: CardEventHandlerType;
  reservationState: ReservationStateType;
}

export default function MobileReservationCard({
  onClick,
  reservationState,
}: MobileReservationCardProps) {
  return (
    <div>
      {!reservationState.isToggleModal && (
        <ReservationFooterMenu
          reservationState={reservationState}
          onClick={onClick}
        />
      )}
      {reservationState.isToggleModal && (
        <ReservationModal
          onClick={onClick}
          reservationState={reservationState}
        />
      )}
    </div>
  );
}
