import classNames from 'classnames';

import Button from '@/components/common/Button';

interface ReservationButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ReservationButton({
  className = '',
  onClick,
  disabled,
}: ReservationButtonProps) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={classNames('button-reservation-default', className)}
    >
      예약하기
    </Button>
  );
}
