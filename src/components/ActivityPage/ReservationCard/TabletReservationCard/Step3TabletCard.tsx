import { useEffect } from 'react';

import ContentTitle from '@/components/ActivityPage/ReservationCard/ReservationCommon/ContentTitle';
import DateTimeSummary from '@/components/ActivityPage/ReservationCard/ReservationCommon/DateTimeSummary';
import ParticipantCounter from '@/components/ActivityPage/ReservationCard/ReservationCommon/ParticipantCounter';
import PriceDisplay from '@/components/ActivityPage/ReservationCard/ReservationCommon/PriceDisplay';
import ReservationButton from '@/components/ActivityPage/ReservationCard/ReservationCommon/ReservationButton';
import TotalSummary from '@/components/ActivityPage/ReservationCard/ReservationCommon/TotalSummary';
import { Modal, useModal } from '@/components/common/Modal';
import { useReservation } from '@/hooks/useReservation';
import { isReservationValid } from '@/lib/utils/isReservationValid';
import {
  CardEventHandlerType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';
interface TabletStep1CardProps {
  onClick: CardEventHandlerType;
  reservationState: ReservationStateType;
}

export default function Step3TabletCard({
  onClick,
  reservationState,
}: TabletStep1CardProps) {
  const { submitReservation, isSuccess, isError } = useReservation();
  const { isOpen, openModal, closeModal, message, modalType } = useModal();
  const isValidate = isReservationValid(reservationState);

  useEffect(() => {
    if (isSuccess) {
      openModal('alert', `예약이 성공적으로 완료되었습니다.`);
    }
    if (isError) {
      openModal(
        'alert',
        `요청하신 날짜에는 예약이 불가능합니다. 다른 날짜를 선택해 주세요.`,
      );
    }
  }, [isSuccess, isError, openModal]);

  return (
    <div className="w-[251px] rounded-xl border-[1px] shadow-md">
      <PriceDisplay
        price={reservationState.price}
        headCount={reservationState.headCount}
      />
      <div className="divider" />
      <div className="pl-[24px]">
        <ContentTitle className="mb-0" />
        <DateTimeSummary
          date={reservationState.date}
          startTime={reservationState.startTime}
          endTime={reservationState.endTime}
          onClick={onClick.stepInit}
          className="text-kv-lg font-kv-semibold text-kv-primary-blue"
        />
      </div>
      <div className="pl-[24px]">
        <ParticipantCounter
          buttonTextClassName="text-kv-black"
          headCount={reservationState.headCount}
          onClick={onClick}
        />
      </div>
      <ReservationButton
        disabled={!isValidate}
        onClick={() => submitReservation(reservationState)}
        className={`mx-auto my-[24px] block w-[203px] rounded-[4px] ${isValidate ? 'bg-kv-primary-blue' : 'bg-kv-gray-300'}`}
      />
      <div className="divider" />
      <TotalSummary
        totalAmount={reservationState.price * reservationState.headCount}
        containerClassName="px-[24px] py-[16px]"
      />
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        message={message}
        type={modalType}
      />
    </div>
  );
}
