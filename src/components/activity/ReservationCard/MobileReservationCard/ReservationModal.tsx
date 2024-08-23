import { useEffect } from 'react';

import Button from '@/components/common/Button';
import useScrollLock from '@/hooks/useScrollLock';
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
  const { isToggleModal } = reservationState;
  useScrollLock({ isOpen: isToggleModal });

  return (
    <div className="fixed inset-0 z-30 flex h-full w-full animate-slideTop flex-col items-center bg-white pt-6">
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
      <div className="w-full max-w-[432px] px-[16px]">
        <Button
          className="my-[16px] h-[56px] w-full rounded-[4px] bg-kv-primary-blue text-white"
          onClick={onClick.handleNextStepClick}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

export default ReservationModal;
