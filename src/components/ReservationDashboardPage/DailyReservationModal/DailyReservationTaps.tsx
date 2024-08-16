import { ReservationStatusResponse } from '@/types/get/ReservationDashboardPageGetTypes';

interface DailyReservationTapsProps {
  reservationStatus: ReservationStatusResponse[];
}

export default function DailyReservationTaps({
  reservationStatus,
}: DailyReservationTapsProps) {
  return (
    <div className="mx-auto mt-[27px] flex h-[42px] w-full items-center border-b border-b-kv-gray-300 pl-[21px]">
      <div className="mx-auto flex w-[343px]">
        <div className="status-tap-base status-active">
          신청{reservationStatus?.[0]?.count.pending}
        </div>
        <div className="status-tap-base">
          승인{reservationStatus?.[0]?.count.confirmed}
        </div>
        <div className="status-tap-base">
          거절{reservationStatus?.[0]?.count.declined}
        </div>
      </div>
    </div>
  );
}
