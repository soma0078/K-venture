import { format, isValid, parseISO } from 'date-fns';

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
