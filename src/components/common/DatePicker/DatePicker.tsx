import 'react-datepicker/dist/react-datepicker.css';

import { ko } from 'date-fns/locale/ko';
import React, { useEffect } from 'react';
import { registerLocale } from 'react-datepicker';

import InlineDateSection from '@/components/common/DatePicker/InlineDateSection';
import PopupDateSection from '@/components/common/DatePicker/PopupDateSection';

interface DatePickerProps {
  onClick: (value: string) => void;
  variant: 'inline' | 'popup';
  noneToggle?: boolean;
  className?: string;
}

export default function DatePicker({
  onClick,
  variant,
  className,
  noneToggle,
}: DatePickerProps) {
  useEffect(() => {
    registerLocale('ko', ko);
  }, []);

  return (
    <>
      {variant === 'inline' && (
        <InlineDateSection
          onClick={onClick}
          className={className}
          noneToggle={noneToggle}
        />
      )}
      {variant === 'popup' && (
        <PopupDateSection onClick={onClick} className={className} />
      )}
    </>
  );
}
