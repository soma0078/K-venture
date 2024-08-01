import DatePicker from 'react-datepicker';

import { getCommonDatePickerProps } from '@/components/common/DatePicker/getCommonDatePickerProps';
import useCalendar from '@/hooks/useCalender';
import { formatDate } from '@/lib/utils/foramtDate';

export default function InlineDateSection({
  onClick,
}: {
  onClick: (value: string) => void;
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
        className="font-kv-semibold text-kv-primary-blue pc:font-kv-semibold tablet:text-kv-lg tablet:font-kv-semibold"
        onClick={toggleCalendar}
      >
        {formatDate(returnValue)}
      </button>
    ),
    openCalendar: (
      <DatePicker inline onClickOutside={toggleCalendar} {...commonProps} />
    ),
  };

  const currentComponent = isOpen ? 'openCalendar' : 'closedCalendar';

  return dateComponents[currentComponent];
}
