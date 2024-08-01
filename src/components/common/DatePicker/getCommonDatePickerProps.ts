import React from 'react';

import { SELECTED_DATE_FORMAT } from '@/constants/datePickerConstants';

import DayMarker from './DayMarker';

export const getCommonDatePickerProps = (
  selectedDate: Date | null,
  today: Date,
  handleDateClick: (date: Date) => void,
) => ({
  selected: selectedDate,
  minDate: today,
  onSelect: (date: Date | null) => {
    handleDateClick(date || today);
  },
  locale: 'ko',
  dateFormat: SELECTED_DATE_FORMAT,
  renderDayContents: (dayOfMonth: number, date: Date | undefined) => {
    if (date === undefined) {
      return dayOfMonth;
    }
    return React.createElement(DayMarker, {
      dayOfMonth,
      date,
      today,
      selectedDate,
    });
  },
});
