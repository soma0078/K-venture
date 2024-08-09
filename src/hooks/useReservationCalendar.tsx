import { ReactNode, useEffect, useState } from 'react';
import { CalendarProps, TileArgs } from 'react-calendar';

export default function useReservationCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [value, setValue] = useState<CalendarProps['value']>(new Date());

  const onDateChange: CalendarProps['onChange'] = (nextValue) => {
    setValue(nextValue);
  };

  const onMonthChange: CalendarProps['onActiveStartDateChange'] = ({
    activeStartDate,
  }) => {
    if (activeStartDate instanceof Date) {
      setCurrentMonth(activeStartDate.getMonth());
    }
  };

  // 이전달 다음달 현재달 클래스 전달하는 함수
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      if (date.getMonth() < currentMonth) {
        return 'previus-month'; // 이전 달
      } else if (date.getMonth() > currentMonth) {
        return 'next-month'; // 다음 달
      }
    }
    return 'text-kv-gray-700'; // 현재 달
  };

  // month 네비게이션으로 month 전환 시
  useEffect(() => {
    if (value instanceof Date) {
      setCurrentMonth(value.getMonth());
    }
  }, [value]);

  // 칩 랜더링
  const tileContent = ({ view }: TileArgs): ReactNode => {
    if (view === 'month') {
      // 월별 보기일 때, 날짜의 숫자만 반환
      // console.log(date.getDate()); // 모든 날짜를 순회함 조건부 리턴만 해주면 요소 추가 가능
      return (
        <div className="chip-container">
          <div className="reservation-chip complete-chip">완료 {10}</div>
          <div className="reservation-chip reserve-chip">예약 {5}</div>
          <div className="reservation-chip approve-chip">승인 {8}</div>
          <div className="color-dot bg-kv-primary-blue" />
        </div>
      );
    }
    return null;
  };

  return {
    tileContent,
    tileClassName,
    onDateChange,
    onMonthChange,
    value,
  };
}
