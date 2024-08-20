import { Calendar } from 'react-calendar';

import DailyReservationModal from '@/components/ReservationDashboardPage/DailyReservationModal';
import ReservationDashboardDropdown from '@/components/ReservationDashboardPage/ReservationDashboardDropdown';
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

  return (
    <div className="flex min-w-[342px] flex-col">
      <div className="mb-[32px]">
        <h1 className="text-kv-3xl font-kv-bold">예약 현황</h1>
      </div>
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
            onClose={handleCloseClick}
            reservationStatus={reservationStatus}
          />
        )}
      </div>
    </div>
  );
}
