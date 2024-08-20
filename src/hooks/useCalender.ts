import { format, isValid } from 'date-fns';
import { useEffect, useState } from 'react';

import {
  API_DATE_FORMAT,
  INLINE_DATE_SECTION_PLACEHOLDER_TEXT,
} from '@/constants/datePickerConstants';

const useCalendar = (onClick: (value: string) => void) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date();
  const [returnValue, setReturnValue] = useState<string>(
    INLINE_DATE_SECTION_PLACEHOLDER_TEXT,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleDateClick = (date: Date | null) => {
    if (date && isValid(date)) {
      setSelectedDate(date);
      setReturnValue(format(date, API_DATE_FORMAT));
    } else {
      setSelectedDate(null);
      setReturnValue(INLINE_DATE_SECTION_PLACEHOLDER_TEXT);
    }
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (returnValue !== INLINE_DATE_SECTION_PLACEHOLDER_TEXT) {
      onClick(returnValue);
      toggleCalendar();
    }
  }, [returnValue, onClick]);

  return {
    selectedDate,
    today,
    handleDateClick,
    returnValue,
    toggleCalendar,
    isOpen,
  };
};

export default useCalendar;
