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

/* NOTE: 값을 선택하고 반영할 수 있는 드롭다운 컴포넌트.
 * 현재 string 받도록 했지만 추후 확장이 필요하면 제네릭으로 string | number 등 받도록 변경가능
 * availableValues: 선택 가능한 값 리스트
 * dropdownRef: 영역 지정을 위한 ref (이 밖을 클릭하면 드롭다운 닫도록 하기 위해)
 * onClickButton: 드롭다운 버튼 클릭시 여닫기
 * onClickMenu: 메뉴 클릭 시 값 변경하고 닫기
 */
export default function MyReservationsDropdown({
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
      {/* 드롭다운 버튼 */}
      <button
        // NOTE: 다른 곳에서 사용시 value-dropdown-button 부분만 필요에 따라 바꾸면 될 것 같습니다.
        className={`flex w-full items-center justify-between rounded border border-kv-gray-79 bg-white p-2.5 pc:px-4 pc:py-[15px] tablet:px-4 tablet:py-[15px] ${
          value ? '' : 'text-kv-gray-a1'
        } relative`}
        type="button"
        onClick={onClickButton}
        onBlur={onBlurButton}
      >
        <span>{value || placeholder}</span>
        {/* NOTE: 다른 곳에서 사용시 아이콘 부분은 바꿔야 할 것 같습니다. */}
        <div className="relative -mr-1 size-5 rounded md:size-6 pc:size-6">
          <Image
            src="/assets/icons/icon_dropdown.svg"
            alt="드롭다운 버튼"
            fill
            className={`${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        // NOTE: 다른 곳에서 사용시 pos-value-dropdown-menus 부분만 필요에 따라 바꾸면 될 것 같습니다.
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
