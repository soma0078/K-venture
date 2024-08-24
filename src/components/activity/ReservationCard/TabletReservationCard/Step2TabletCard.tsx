import ReservationButton from '@/components/activity/ReservationCard/ReservationCommon/ReservationButton';
import ReservationHeader from '@/components/activity/ReservationCard/ReservationCommon/ReservationHeader';
import TimeSelector from '@/components/activity/ReservationCard/ReservationCommon/TimeSelector';
import DatePicker from '@/components/common/DatePicker/DatePicker';
import {
  CardEventHandlerType,
  ReservationStateType,
} from '@/types/activityDetailPageTypes';

interface TabletStep2CardProps {
  onClick: CardEventHandlerType;
  reservationState: ReservationStateType;
}

export default function Step2TabletCard({
  onClick,
  reservationState,
}: TabletStep2CardProps) {
  return (
    <div className="absolute right-6 z-10 w-[480px] rounded-xl border-[1px] bg-white shadow-md">
      <ReservationHeader
        title="date"
        onCloseClick={onClick.handleCloseClick}
        containerClassName="w-[432px] mt-[28px]"
      />
      <div className="mb-[24px] align-center">
        <DatePicker
          onClick={(date) => {
            onClick.handleCalendarClick(date);
          }}
          variant="inline"
          noneToggle={true}
          reservationState={reservationState}
          className="text-kv-md font-kv-semibold"
        />
      </div>
      <div className="mx-auto w-[432px]">
        <TimeSelector onClick={onClick} reservationState={reservationState} />
      </div>
      <ReservationButton
        className="mx-auto block w-[432px]"
        onClick={onClick.handleNextStepClick}
      />
    </div>
  );
}
