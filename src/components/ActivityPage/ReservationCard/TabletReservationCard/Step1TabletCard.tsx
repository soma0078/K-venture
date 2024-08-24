import ContentTitle from '@/components/ActivityPage/ReservationCard/ReservationCommon/ContentTitle';
import ParticipantCounter from '@/components/ActivityPage/ReservationCard/ReservationCommon/ParticipantCounter';
import PriceDisplay from '@/components/ActivityPage/ReservationCard/ReservationCommon/PriceDisplay';
import ReservationButton from '@/components/ActivityPage/ReservationCard/ReservationCommon/ReservationButton';
import SelectDateTextButton from '@/components/ActivityPage/ReservationCard/ReservationCommon/SelectDateTextButton';
import TotalSummary from '@/components/ActivityPage/ReservationCard/ReservationCommon/TotalSummary';
import {
  CardEventHandlerType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';

interface TabletStep1CardProps {
  onClick: CardEventHandlerType;
  reservationState: ReservationStateType;
}

export default function Step1TabletCard({
  onClick,
  reservationState,
}: TabletStep1CardProps) {
  return (
    <div className="w-[251px] rounded-xl border-[1px] shadow-md">
      <PriceDisplay
        price={reservationState.price}
        headCount={reservationState.headCount}
      />
      <div className="divider" />
      <div className="mb-[27px] pl-[24px]">
        <ContentTitle className="mb-0" />
        <SelectDateTextButton onClick={onClick.handleNextStepClick} />
      </div>
      <div className="pl-[24px]">
        <ParticipantCounter
          buttonTextClassName="text-kv-black"
          headCount={reservationState.headCount}
          onClick={onClick}
        />
      </div>
      <ReservationButton className="mx-auto my-[24px] block h-[56px] w-[203px] rounded-[4px] bg-kv-gray-600" />
      <div className="mb-[16px] divider" />
      <TotalSummary
        totalAmount={reservationState.price * reservationState.headCount}
        containerClassName="px-[24px] py-[16px]"
      />
    </div>
  );
}
