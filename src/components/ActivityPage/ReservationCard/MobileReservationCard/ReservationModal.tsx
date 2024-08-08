import { useEffect } from 'react';

import Button from '@/components/common/Button';
import {
  CardEventHandlerType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';

import Step1MobileCard from './Step1MobileCard';
import Step2MobileCard from './Step2MobileCard';

export interface ReservationModalProps {
  onClick: CardEventHandlerType;
  reservationState: ReservationStateType;
}

function ReservationModal({
  onClick,
  reservationState,
}: ReservationModalProps) {
  useEffect(() => {
    if (reservationState.step === 3) {
      onClick.stepInit();
      onClick.handleModalToggle();
    }
  }, [reservationState.step]);

  return (
    <div className="fixed inset-0 z-10 flex h-full w-full flex-col items-center bg-white pt-6">
      {reservationState.step === 1 && (
        <Step1MobileCard
          onClick={onClick}
          reservationState={reservationState}
        />
      )}
      {reservationState.step === 2 && (
        <Step2MobileCard
          onClick={onClick}
          headCount={reservationState.headCount}
        />
      )}
      <Button
        className="my-[16px] h-[56px] w-[327px] rounded-[4px] bg-kv-primary-blue text-white"
        onClick={onClick.handleNextStepClick}
      >
        확인
      </Button>
    </div>
  );
}

export default ReservationModal;
