import classNames from 'classnames';

import { formatDate } from '@/lib/utils/formatDate';

interface DateTimeSummaryProps {
  date: string;
  startTime: string;
  endTime: string;
  onClick: () => void;
  className?: string;
}

export default function DateTimeSummary({
  date,
  startTime,
  endTime,
  onClick,
  className,
}: DateTimeSummaryProps) {
  return (
    <div
      className={classNames(
        'w-[200px] text-kv-md font-kv-semibold hover:cursor-pointer hover:text-kv-primary-blue hover:underline',
        className,
      )}
      onClick={onClick}
    >
      <span>{formatDate(date)}</span> {`${startTime} ~ ${endTime}`}
    </div>
  );
}
