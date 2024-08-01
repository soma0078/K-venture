import 'react-datepicker/dist/react-datepicker.css';

import { ko } from 'date-fns/locale/ko';
import React, { useEffect } from 'react';
import { registerLocale } from 'react-datepicker';

import InlineDateSection from '@/components/common/DatePicker/InlineDateSection';
import PopupDateSection from '@/components/common/DatePicker/PopupDateSection';

type DatePickerProps = {
  onClick: (value: string) => void;
  variant: 'inline' | 'popup';
};

export default function DatePicker({ onClick, variant }: DatePickerProps) {
  useEffect(() => {
    registerLocale('ko', ko);
  }, []);

  return (
    <>
      {variant === 'inline' && <InlineDateSection onClick={onClick} />}
      {variant === 'popup' && <PopupDateSection onClick={onClick} />}
    </>
  );
}
