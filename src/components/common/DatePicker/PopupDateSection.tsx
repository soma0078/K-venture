import classNames from 'classnames';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';

import CalendarInput from '@/components/common/DatePicker/CalendarInput';
import {
  POPUP_DATE_SECTION_PLACEHOLDER_TEXT,
  SELECTED_DATE_FORMAT,
} from '@/constants/datePickerConstants';
import useCalendar from '@/hooks/useCalender';

export default function PopupDateSection({
  onClick,
  className,
}: {
  onClick: (value: string) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedDate, today, handleDateClick } = useCalendar(onClick);

  return (
    <div className="custom-datepicker">
      <DatePicker
        placeholderText={POPUP_DATE_SECTION_PLACEHOLDER_TEXT}
        selected={selectedDate}
        minDate={today}
        locale="ko"
        dateFormat={SELECTED_DATE_FORMAT}
        onSelect={(date: Date | null) => {
          handleDateClick(date || today);
        }}
        customInput={
          <CalendarInput
            ref={inputRef}
            className={classNames(
              `h-[40px] w-[132px] cursor-pointer pl-[10px] caret-transparent outline-none pc:h-[56px] pc:w-[379px] pc:pl-[16px] pc:text-kv-lg tablet:h-[56px] tablet:w-[149px] tablet:pl-[16px] tablet:text-kv-lg`,
              className,
            )}
          />
        }
      />
    </div>
  );
}
