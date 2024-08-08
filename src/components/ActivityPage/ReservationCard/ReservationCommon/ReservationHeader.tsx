import classNames from 'classnames';
import React from 'react';

import IconClose from '@/assets/icons/iocn_x_lg.svg';
import {
  RESERVATION_TITLE,
  ReservationTitleKey,
} from '@/constants/reservationCardConstants';

interface ReservationHeaderProps {
  onCloseClick: () => void;
  containerClassName?: string;
  titleClassName?: string;
  iconClassName?: string;
  title: ReservationTitleKey;
}

export default function ReservationHeader({
  onCloseClick,
  containerClassName = '',
  titleClassName = '',
  iconClassName = '',
  title,
}: ReservationHeaderProps) {
  return (
    <div
      className={classNames('container-header-reservation', containerClassName)}
    >
      <span className={classNames('title-header-reservation', titleClassName)}>
        {RESERVATION_TITLE[title]}
      </span>
      <IconClose
        className={classNames('icon-header-reservation', iconClassName)}
        onClick={onCloseClick}
      />
    </div>
  );
}
