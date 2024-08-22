import DailyReservationDateDropdown from '@/components/ReservationDashboardPage/DailyReservationModal/DailyReservationDateDropdown';
import DailyReservationList from '@/components/ReservationDashboardPage/DailyReservationModal/DailyReservationList';
import DailyReservationModalHeader from '@/components/ReservationDashboardPage/DailyReservationModal/DailyReservationModalHeader';
import DailyReservationTaps from '@/components/ReservationDashboardPage/DailyReservationModal/DailyReservationTaps';
import { ReservationStatusResponse } from '@/types/get/ReservationDashboardPageGetTypes';

interface DailyReservationModalProps {
  onClose: () => void;
  isOpenInfo: Boolean;
  reservationStatus?: ReservationStatusResponse[];
}

export default function DailyReservationModal({
  onClose,
  isOpenInfo,
  reservationStatus,
}: DailyReservationModalProps) {
  return (
    <>
      <div
        className={`${isOpenInfo && 'animate-slideTop'} fixed z-20 h-full w-full bg-white shadow-lg pc:absolute pc:right-0 pc:top-[60px] pc:h-[697px] pc:w-[429px] pc:rounded-3xl pc:border pc:border-kv-gray-400 tablet:absolute tablet:right-0 tablet:top-[60px] tablet:h-[697px] tablet:w-[429px] tablet:rounded-3xl tablet:border tablet:border-kv-gray-400 mobile:left-0 mobile:top-0 mobile:z-30 mobile:min-w-[319px]`}
      >
        <DailyReservationModalHeader onClose={onClose} />
        {reservationStatus && (
          <>
            <DailyReservationTaps reservationStatus={reservationStatus} />
            <DailyReservationDateDropdown
              reservationStatus={reservationStatus}
            />
          </>
        )}
        <DailyReservationList />
      </div>
      <div className="backdrop" onClick={onClose} />
    </>
  );
}
