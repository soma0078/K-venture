import { format, isValid, parse, parseISO } from 'date-fns';

import { SELECTED_DATE_FORMAT } from '@/constants/datePickerConstants';

export const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return isValid(date) ? format(date, SELECTED_DATE_FORMAT) : dateString;
};

// YYYY-MM-DD -> YY/MM/DD
export const convertAPItoSelected = (dateString: string) => {
  const date = new Date(dateString);
  return isValid(date) ? format(date, SELECTED_DATE_FORMAT) : '';
};

// Date Object -> YYYY-MM-DD
export const formatDateToYMD = (date: Date) => {
  return isValid(date) ? format(date, 'yyyy-MM-dd') : '';
};

// yy/mm/dd -> yyyy-mm-dd
export const convertYYMMDDtoYMD = (dateString: string): string => {
  const parsedDate = parse(dateString, 'yy/MM/dd', new Date());
  return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd') : '';
};
