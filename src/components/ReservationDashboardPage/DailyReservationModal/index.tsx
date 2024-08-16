import DailyReservationDateDropdown from '@/components/ReservationDashboardPage/DailyReservationModal/DailyReservationDateDropdown';
import DailyReservationModalHeader from '@/components/ReservationDashboardPage/DailyReservationModal/DailyReservationModalHeader';
import DailyReservationTaps from '@/components/ReservationDashboardPage/DailyReservationModal/DailyReservationTaps';
import useDailyReservationData from '@/hooks/useDailyReservationData';

interface DailyReservationModalProps {
  onClose: () => void;
}

export default function DailyReservationModal({
  onClose,
}: DailyReservationModalProps) {
  const { reservationStatus, reservationDetails } = useDailyReservationData();
  const isEmptyData =
    reservationStatus === undefined || reservationStatus.length === 0;

  if (isEmptyData) return null;

  return (
    <div className="fixed h-full w-full bg-white shadow-lg pc:absolute pc:right-[28px] pc:top-[336px] pc:h-[697px] pc:w-[429px] pc:rounded-3xl pc:border pc:border-kv-gray-400 tablet:absolute tablet:right-[28px] tablet:top-[306px] tablet:h-[697px] tablet:w-[429px] tablet:rounded-3xl tablet:border tablet:border-kv-gray-400 mobile:left-0 mobile:top-0 mobile:z-10">
      <DailyReservationModalHeader onClose={onClose} />
      {reservationStatus && (
        <>
          <DailyReservationTaps reservationStatus={reservationStatus} />
          <DailyReservationDateDropdown reservationStatus={reservationStatus} />
        </>
      )}
      {/* <DailyReservationList /> */}
      <div className="mx-auto mt-[27px] h-[294px] w-[343px]">
        <p className="sub-title mb-[16px]">예약 내역</p>
        {reservationDetails?.reservations.map(
          ({ nickname, headCount }, index) => {
            return (
              <div key={index}>
                <div>닉네임: {nickname}</div>
                <div>인원: {headCount}</div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
