import { Calendar } from 'react-calendar';

import DailyReservationModal from '@/components/ReservationDashboardPage/DailyReservationModal';
import NoReservationsState from '@/components/ReservationDashboardPage/NoReservationsState';
import ReservationDashboardDropdown from '@/components/ReservationDashboardPage/ReservationDashboardDropdown';
import { ReservationDashboardHeader } from '@/components/ReservationDashboardPage/ReservationDashboardHeader';
import useDropdown from '@/hooks/useDropdown';
import useReservationCalendar from '@/hooks/useReservationCalendar';
import useReservationDashboardData from '@/hooks/useReservationDashboardData';

export default function ReservationDashboard() {
  const { availableActivities, isOpenInfo, handleCloseClick, handleOpenClick } =
    useReservationDashboardData();

  const {
    value: dropdownValue,
    isOpen,
    onClickButton,
    onBlurButton,
    onClickMenu,
  } = useDropdown('');

  const {
    tileContent,
    tileClassName,
    onDateChange,
    onMonthChange,
    value: calendarValue,
    reservationStatus,
  } = useReservationCalendar({ onOpen: handleOpenClick });

  if (availableActivities.length === 0) return <NoReservationsState />;

  return (
    <div className="reservation-dashboard-container">
      <ReservationDashboardHeader />
      <div className="mb-[24px] h-[56px]">
        <ReservationDashboardDropdown
          label="체험명"
          value={dropdownValue}
          availableValues={availableActivities}
          placeholder="체험명을 선택해주세요"
          isOpen={isOpen}
          onClickButton={onClickButton}
          onBlurButton={onBlurButton}
          onClickMenu={onClickMenu}
        />
      </div>
      <div className="relative h-[872px]">
        <Calendar
          locale="ko-KR"
          calendarType="gregory"
          tileContent={tileContent}
          tileClassName={tileClassName}
          formatDay={(_, date) => date.getDate().toString()}
          onChange={onDateChange}
          onActiveStartDateChange={onMonthChange}
          value={calendarValue}
          minDetail={'month'}
          className="custom-calendar"
        />
        {isOpenInfo && (
          <DailyReservationModal
            isOpenInfo={isOpenInfo}
            onClose={handleCloseClick}
            reservationStatus={reservationStatus}
          />
        )}
      </div>
    </div>
  );
}
