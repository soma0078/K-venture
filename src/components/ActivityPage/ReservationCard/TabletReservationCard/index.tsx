import React, { useState } from 'react';

import TabletStep2Card from '@/components/ActivityPage/ReservationCard/TabletReservationCard/Step2TabletCard';
import {
  CardEventHandlerType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';

import TabletStep1Card from './Step1TabletCard';
import TabletStep3Card from './Step3TabletCard';

interface TabletReservationCardProps {
  onClick: CardEventHandlerType;
  reservationState: ReservationStateType;
}
export default function TabletReservationCard({
  onClick,
  reservationState,
}: TabletReservationCardProps) {
  return (
    <>
      {reservationState.step === 1 && (
        <TabletStep1Card
          reservationState={reservationState}
          onClick={onClick}
        />
      )}
      {reservationState.step === 2 && (
        <TabletStep2Card
          reservationState={reservationState}
          onClick={onClick}
        />
      )}
      {reservationState.step === 3 && (
        <TabletStep3Card
          reservationState={reservationState}
          onClick={onClick}
        />
      )}
    </>
  );
}
