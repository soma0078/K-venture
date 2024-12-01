import EmptyState from '@/components/common/EmptyState';

import { ReservationDashboardHeader } from './ReservationDashboardHeader';

export default function NoReservationsState() {
  return (
    <div className="reservation-dashboard-container">
      <ReservationDashboardHeader />
      <EmptyState message="아직 등록한 체험이 없어요" />
    </div>
  );
}
