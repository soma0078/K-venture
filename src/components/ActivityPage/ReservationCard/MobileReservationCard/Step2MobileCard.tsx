import ParticipantCounter from '@/components/ActivityPage/ReservationCard/ReservationCommon/ParticipantCounter';
import ReservationHeader from '@/components/ActivityPage/ReservationCard/ReservationCommon/ReservationHeader';
import { CardEventHandlerType } from '@/types/activityDetailPageTypes';

interface Step2MobileCardProps {
  onClick: CardEventHandlerType;
  headCount: number;
}

export default function Step2MobileCard({
  onClick,
  headCount,
}: Step2MobileCardProps) {
  return (
    <>
      <ReservationHeader
        title="headCount"
        onCloseClick={onClick.handleCloseClick}
      />
      <ParticipantCounter onClick={onClick} headCount={headCount} />
    </>
  );
}
