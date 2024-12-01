import ReservationHeader from '@/components/activity/ReservationCard/ReservationCommon/ReservationHeader';
import TimeSelector from '@/components/activity/ReservationCard/ReservationCommon/TimeSelector';
import DatePicker from '@/components/common/DatePicker/DatePicker';
import {
  CardEventHandlerType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';

interface Step1MobileCardProps {
  onClick: CardEventHandlerType;
  reservationState: ReservationStateType;
}

export default function Step1MobileCard({
  onClick,
  reservationState,
}: Step1MobileCardProps) {
  return (
    <>
      <ReservationHeader
        containerClassName="w-full max-w-[432px] px-[24px]"
        title="date"
        onCloseClick={onClick.handleCloseClick}
      />
      <div className="mb-[24px] w-full align-center">
        <DatePicker
          onClick={(date) => {
            onClick.handleCalendarClick(date);
          }}
          variant="inline"
          noneToggle={true}
          reservationState={reservationState}
          //className="text-kv-md font-kv-semibold"
        />
      </div>
      <div className="h-full w-full max-w-[432px] px-[24px] text-kv-primary-blue">
        <TimeSelector onClick={onClick} reservationState={reservationState} />
      </div>
    </>
  );
}
