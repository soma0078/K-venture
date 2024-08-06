import classNames from 'classnames';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';

import CalendarInput from '@/components/common/DatePicker/CalendarInput';
import { getCommonDatePickerProps } from '@/components/common/DatePicker/getCommonDatePickerProps';
import { POPUP_DATE_SECTION_PLACEHOLDER_TEXT } from '@/constants/datePickerConstants';
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

  const commonProps = getCommonDatePickerProps(
    selectedDate,
    today,
    handleDateClick,
  );

  return (
    <div className="custom-datepicker">
      <DatePicker
        placeholderText={POPUP_DATE_SECTION_PLACEHOLDER_TEXT}
        customInput={
          <CalendarInput
            ref={inputRef}
            className={classNames(
              `h-[40px] w-[132px] cursor-pointer pl-[10px] caret-transparent outline-none pc:h-[56px] pc:w-[379px] pc:pl-[16px] pc:text-kv-lg tablet:h-[56px] tablet:w-[149px] tablet:pl-[16px] tablet:text-kv-lg`,
              className,
            )}
          />
        }
        {...commonProps}
      />
    </div>
  );
}
