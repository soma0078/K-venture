import classNames from 'classnames';
import React from 'react';

import { getFormattedAmount } from '@/lib/utils/getFormattedAmount';

interface TotalSummaryProps {
  totalAmount: number;
  containerClassName?: string;
  labelClassName?: string;
  amountClassName?: string;
}

export default function TotalSummary({
  totalAmount = 0,
  containerClassName = '',
  labelClassName = '',
  amountClassName = '',
}: TotalSummaryProps) {
  const formattedAmount = getFormattedAmount(totalAmount);

  return (
    <div
      className={classNames(
        'container-summary-total-default',
        containerClassName,
      )}
    >
      <span
        className={classNames('label-summary-total-default', labelClassName)}
      >
        총 합계
      </span>
      <span
        className={classNames('amount-summary-total-default', amountClassName)}
      >
        {formattedAmount}
      </span>
    </div>
  );
}
