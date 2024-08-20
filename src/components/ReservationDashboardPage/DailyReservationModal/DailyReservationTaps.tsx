import { useAtom } from 'jotai';

import { dailyReservationModalAtom } from '@/state/reservationDashboardAtom';
import { ReservationStatusResponse } from '@/types/get/ReservationDashboardPageGetTypes';

interface DailyReservationTapsProps {
  reservationStatus: ReservationStatusResponse[];
}

export default function DailyReservationTaps({
  reservationStatus,
}: DailyReservationTapsProps) {
  const [{ status }, setSelectedStatus] = useAtom(dailyReservationModalAtom);

  const handleTapClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) => {
    setSelectedStatus((prev) => ({
      ...prev,
      scheduleId: 0,
      status: currentTarget.dataset.status as
        | 'pending'
        | 'confirmed'
        | 'declined',
    }));
  };

  const { pending, confirmed, declined } = reservationStatus.reduce(
    (acc, curr) => ({
      pending: acc.pending + (curr.count.pending || 0),
      confirmed: acc.confirmed + (curr.count.confirmed || 0),
      declined: acc.declined + (curr.count.declined || 0),
    }),
    { pending: 0, confirmed: 0, declined: 0 },
  );

  const taps = [
    { status: 'pending', label: '신청', count: pending },
    { status: 'confirmed', label: '승인', count: confirmed },
    { status: 'declined', label: '거절', count: declined },
  ];

  return (
    <div className="mx-auto mt-[27px] flex h-[42px] w-full items-center border-b border-b-kv-gray-300 pl-[21px]">
      <div className="mx-auto flex w-[343px]">
        {taps.map((tap) => (
          <div
            className={`daily-modal-status-tap-base ${status === tap.status && 'daily-modal-status-active'} ${tap.count === 0 && 'cursor-default'}`}
            key={tap.status}
            data-status={tap.status}
            onClick={tap.count !== 0 ? handleTapClick : undefined}
          >
            {tap.label} {tap.count}
          </div>
        ))}
      </div>
    </div>
  );
}
