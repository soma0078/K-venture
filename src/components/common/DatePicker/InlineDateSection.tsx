import classNames from 'classnames';
import DatePicker from 'react-datepicker';

import { BookingDot } from '@/components/common/DatePicker/BookingDot';
import {
  INLINE_DATE_SECTION_PLACEHOLDER_TEXT,
  SELECTED_DATE_FORMAT,
} from '@/constants/datePickerConstants';
import useCalendar from '@/hooks/useCalender';
import { formatDate } from '@/lib/utils/formatDate';
import { ReservationStateType } from '@/types/activityDetailPageTypes';

export default function InlineDateSection({
  onClick,
  className,
  noneToggle,
  reservationState,
}: {
  onClick: (value: string) => void;
  className?: string;
  noneToggle?: boolean;
  reservationState?: ReservationStateType;
}) {
  const {
    selectedDate,
    today,
    handleDateClick,
    returnValue,
    toggleCalendar,
    isOpen,
  } = useCalendar(onClick);

  const dateComponents = {
    closedCalendar: (
      <button
        className={classNames(
          'font-kv-semibold',
          {
            'text-black': returnValue !== INLINE_DATE_SECTION_PLACEHOLDER_TEXT,
            'text-kv-primary-blue underline':
              returnValue === INLINE_DATE_SECTION_PLACEHOLDER_TEXT,
          },
          className,
        )}
        onClick={toggleCalendar}
      >
        {formatDate(returnValue)}
      </button>
    ),
    openCalendar: (
      <div className="custom-datepicker">
        <DatePicker
          inline
          onClickOutside={toggleCalendar}
          selected={selectedDate}
          minDate={today}
          locale="ko"
          dateFormat={SELECTED_DATE_FORMAT}
          onSelect={(date: Date | null) => {
            handleDateClick(date || today);
          }}
          renderDayContents={(day, date) => (
            <BookingDot
              day={day}
              date={date}
              reservationState={reservationState}
            />
          )}
        />
      </div>
    ),
  };

  const currentComponent = isOpen ? 'openCalendar' : 'closedCalendar';

  if (noneToggle) return dateComponents.openCalendar;

  return dateComponents[currentComponent];
}
