import classNames from 'classnames';

import MinusIcon from '@/assets/icons/icon_decrease.svg';
import PlusIcon from '@/assets/icons/icon_increase.svg';
import { RESERVATION_PARTICIPANT_COUNTER_PLACEHOLDER } from '@/constants/reservationCardConstants';
import useResponsive from '@/hooks/useResponsive';
import { CardEventHandlerType } from '@/types/activityDetailPageTypes';

interface ParticipantCounterProps {
  onClick: CardEventHandlerType;
  headCount: number;
  containerClassName?: string;
  titleClassName?: string;
  counterClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

function ParticipantCounter({
  onClick,
  headCount,
  containerClassName = '',
  titleClassName = '',
  counterClassName = '',
  buttonClassName = '',
  buttonTextClassName = '',
}: ParticipantCounterProps) {
  const { isMobile } = useResponsive();

  return (
    <div
      className={classNames(
        'container-counter-participant-default',
        containerClassName,
      )}
    >
      <p
        className={classNames(
          'title-counter-participant-default',
          titleClassName,
        )}
      >
        {isMobile
          ? RESERVATION_PARTICIPANT_COUNTER_PLACEHOLDER.mobile
          : RESERVATION_PARTICIPANT_COUNTER_PLACEHOLDER.noMobile}
      </p>
      <div
        className={classNames('counter-participant-default', counterClassName)}
      >
        <div
          className={classNames(
            'button-counter-participant-default',
            buttonClassName,
          )}
          onClick={() => onClick.handleHeadCountChange(headCount - 1)}
        >
          <MinusIcon
            className={classNames(
              'icon-button-counter-participant-default',
              buttonTextClassName,
            )}
          />
        </div>
        <span
          className={classNames(
            'text-button-counter-participant-default',
            buttonTextClassName,
          )}
        >
          {headCount}
        </span>
        <div
          className={classNames(
            'button-counter-participant-default',
            buttonClassName,
          )}
          onClick={() => onClick.handleHeadCountChange(headCount + 1)}
        >
          <PlusIcon
            className={classNames(
              'icon-button-counter-participant-default',
              buttonTextClassName,
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ParticipantCounter;
