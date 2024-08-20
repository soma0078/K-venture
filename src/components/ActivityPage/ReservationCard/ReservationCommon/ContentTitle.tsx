import classNames from 'classnames';
import React from 'react';

import { RESERVATION_TITLE } from '@/constants/reservationCardConstants';

interface ContentTitleProps {
  className?: string;
}

export default function ContentTitle({ className = '' }: ContentTitleProps) {
  return (
    <h2 className={classNames('base-title-content', className)}>
      {RESERVATION_TITLE.date}
    </h2>
  );
}
