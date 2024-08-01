import { useRef } from 'react';
import DatePicker from 'react-datepicker';

import CalendarInput from '@/components/common/DatePicker/CalendarInput';
import { getCommonDatePickerProps } from '@/components/common/DatePicker/getCommonDatePickerProps';
import { POPUP_DATE_SECTION_PLACEHOLDER_TEXT } from '@/constants/datePickerConstants';
import useCalendar from '@/hooks/useCalender';

export default function PopupDateSection({
  onClick,
}: {
  onClick: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedDate, today, handleDateClick } = useCalendar(onClick);

  const commonProps = getCommonDatePickerProps(
    selectedDate,
    today,
    handleDateClick,
  );

  return (
    <DatePicker
      className="react-datepicker"
      placeholderText={POPUP_DATE_SECTION_PLACEHOLDER_TEXT}
      customInput={
        <CalendarInput
          ref={inputRef}
          className="h-[40px] w-[132px] cursor-pointer pl-[10px] caret-transparent outline-none pc:h-[56px] pc:w-[379px] pc:pl-[16px] pc:text-kv-lg tablet:h-[56px] tablet:w-[149px] tablet:pl-[16px] tablet:text-kv-lg"
        />
      }
      {...commonProps}
    />
  );
}
