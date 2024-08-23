import 'react-datepicker/dist/react-datepicker.css';

import { ko } from 'date-fns/locale/ko';
import React, { useEffect } from 'react';
import { registerLocale } from 'react-datepicker';

import InlineDateSection from '@/components/common/DatePicker/InlineDateSection';
import PopupDateSection from '@/components/common/DatePicker/PopupDateSection';
import { ReservationStateType } from '@/types/activityDetailPageTypes';

interface DatePickerProps {
  onClick: (value: string) => void;
  variant: 'inline' | 'popup';
  noneToggle?: boolean;
  className?: string;
  reservationState?: ReservationStateType;
}

export default function DatePicker({
  onClick,
  variant,
  className,
  noneToggle,
  reservationState,
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
          reservationState={reservationState}
        />
      )}
      {variant === 'popup' && (
        <PopupDateSection
          onClick={onClick}
          className={className}
          reservationState={reservationState}
        />
      )}
    </>
  );
}
