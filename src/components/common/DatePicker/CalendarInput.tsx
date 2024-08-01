import React, { forwardRef } from 'react';

import IconCalendarInput from '@/assets/icons/icon_calendar_input.svg';

const CalendarInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function CalendarInput(props, ref) {
  return (
    <div className="relative flex items-center justify-between">
      <input ref={ref} type="text" readOnly {...props} />
      <IconCalendarInput className="absolute right-[12px] h-[27px] w-[27px] pc:right-[26px] tablet:right-[18px]" />
    </div>
  );
});

export default CalendarInput;
