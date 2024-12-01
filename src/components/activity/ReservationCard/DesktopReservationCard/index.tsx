import React from 'react';

import ContentTitle from '@/components/activity/ReservationCard/ReservationCommon/ContentTitle';
import ParticipantCounter from '@/components/activity/ReservationCard/ReservationCommon/ParticipantCounter';
import PriceDisplay from '@/components/activity/ReservationCard/ReservationCommon/PriceDisplay';
import ReservationButton from '@/components/activity/ReservationCard/ReservationCommon/ReservationButton';
import TimeSelector from '@/components/activity/ReservationCard/ReservationCommon/TimeSelector';
import TotalSummary from '@/components/activity/ReservationCard/ReservationCommon/TotalSummary';
import DatePicker from '@/components/common/DatePicker/DatePicker';
import { Modal } from '@/components/common/Modal';
import { useReservation } from '@/hooks/useReservation';
import { isReservationValid } from '@/lib/utils/isReservationValid';
import {
  CardEventHandlerType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';

interface DesktopReservationCardProps {
  onClick: CardEventHandlerType;
  reservationState: ReservationStateType;
}

export default function DesktopReservationCard({
  onClick,
  reservationState,
}: DesktopReservationCardProps) {
  const { submitReservation, modalProps } = useReservation();
  const isValidate = isReservationValid(reservationState);

  const handleSubmit = () => {
    submitReservation(reservationState);
  };

  return (
    <>
      <Modal {...modalProps} />
      <div className="w-[384px] rounded-lg border bg-white p-4 shadow-lg">
        <PriceDisplay
          containerClassName="pt-[20px] pl-0"
          priceClassName="text-kv-3xl font-kv-bold"
          unitClassName="text-kv-xl font-kv-regular"
          price={reservationState.price}
          headCount={reservationState.headCount}
        />
        <div className="!my-[16px] divider" />
        <div className="mx-auto w-[336px]">
          <ContentTitle />
          <div className="mb-[16px] align-center">
            <DatePicker
              reservationState={reservationState}
              onClick={onClick.handleCalendarClick}
              variant="inline"
              noneToggle={true}
              className="z-0 mb-4 w-full"
            />
          </div>
          <TimeSelector onClick={onClick} reservationState={reservationState} />
          <div className="mb-[12px] mt-[16px] divider" />
          <ParticipantCounter
            headCount={reservationState.headCount}
            onClick={onClick}
          />
          <ReservationButton
            disabled={!isValidate}
            className={`mx-auto my-[24px] block w-full rounded-[4px] ${isValidate ? 'bg-kv-primary-blue hover:bg-kv-primary-blue-hover' : 'bg-kv-gray-300'}`}
            onClick={handleSubmit}
          />
          <div className="divider" />
          <TotalSummary
            totalAmount={reservationState.price * reservationState.headCount}
          />
        </div>
      </div>
    </>
  );
}
