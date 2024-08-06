import classNames from 'classnames';
import DatePicker from 'react-datepicker';

import { getCommonDatePickerProps } from '@/components/common/DatePicker/getCommonDatePickerProps';
import { INLINE_DATE_SECTION_PLACEHOLDER_TEXT } from '@/constants/datePickerConstants';
import useCalendar from '@/hooks/useCalender';
import { formatDate } from '@/lib/utils/formatDate';

export default function InlineDateSection({
  onClick,
  className,
}: {
  onClick: (value: string) => void;
  className?: string;
}) {
  const {
    selectedDate,
    today,
    handleDateClick,
    returnValue,
    toggleCalendar,
    isOpen,
  } = useCalendar(onClick);

  const commonProps = getCommonDatePickerProps(
    selectedDate,
    today,
    handleDateClick,
  );

  const dateComponents = {
    closedCalendar: (
      <button
        className={classNames(
          'font-kv-semibold',
          {
            'text-black': returnValue !== INLINE_DATE_SECTION_PLACEHOLDER_TEXT,
            'text-kv-primary-blue underline':
              returnValue === INLINE_DATE_SECTION_PLACEHOLDER_TEXT,
          },
          className,
        )}
        onClick={toggleCalendar}
      >
        {formatDate(returnValue)}
      </button>
    ),
    openCalendar: (
      <div className="custom-datepicker">
        <DatePicker inline onClickOutside={toggleCalendar} {...commonProps} />
      </div>
    ),
  };

  const currentComponent = isOpen ? 'openCalendar' : 'closedCalendar';

  return dateComponents[currentComponent];
}
