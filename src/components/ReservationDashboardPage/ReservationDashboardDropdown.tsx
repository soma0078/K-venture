import Image from 'next/image';
import { MouseEventHandler } from 'react';

import { AvailableValues } from '@/types/page/ReservationDashboardPageTypes';

interface ReservationDashboardDropdownProps {
  value: string;
  placeholder: string;
  availableValues: AvailableValues[];
  isOpen: boolean;
  onClickButton: MouseEventHandler<HTMLButtonElement>;
  onBlurButton: () => void;
  onClickMenu: (value: string) => MouseEventHandler;
  label?: string;
}

export default function ReservationDashboardDropdown({
  value,
  placeholder,
  availableValues,
  isOpen,
  onClickButton,
  onBlurButton,
  onClickMenu,
  label,
}: ReservationDashboardDropdownProps) {
  return (
    <div className="relative w-full">
      {label && (
        <div className="absolute left-[11px] z-[1] h-[2px] w-[38px] bg-white">
          <label className="absolute -top-[10px] z-10 text-sm text-kv-black">
            {label}
          </label>
        </div>
      )}
      <button
        className={`flex w-full items-center justify-between rounded border border-kv-gray-79 bg-white p-2.5 pc:px-4 pc:py-[15px] tablet:px-4 tablet:py-[15px] ${
          value ? '' : 'text-kv-gray-a1'
        } relative`}
        type="button"
        onClick={onClickButton}
        onBlur={onBlurButton}
      >
        <span>{value || placeholder}</span>
        <div className="relative -mr-1 size-5 rounded md:size-6 pc:size-6">
          <Image
            src="/assets/icons/icon_dropdown.svg"
            alt="드롭다운 버튼"
            fill
            className={`${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <ul className="pos-value-dropdown-menus absolute z-10 w-full flex-col rounded-md shadow-md scrollbar-custom">
          {availableValues.map(({ title, id }, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === availableValues.length - 1;
            return (
              <button
                key={id}
                id={`${id}`}
                className={`dropdown-menu w-full ${isFirst ? 'rounded-t-md' : ''} ${isLast ? 'rounded-b-md' : 'border-b'}`}
                onMouseDown={(e) => {
                  onClickMenu(title)(e);
                }}
              >
                {title}
              </button>
            );
          })}
        </ul>
      )}
    </div>
  );
}
