import { useAtom } from 'jotai';
import { MouseEventHandler, useState } from 'react';

import { reservationDashboardQueryParamsAtom } from '@/state/reservationDashboardAtom';
// 값 선택 드롭다운 관리를 위한 훅
const useDropdown = <T>(initValue: T) => {
  const [value, setValue] = useState(initValue);
  const [isOpen, setIsOpen] = useState(false);
  const [, setCalendarState] = useAtom(reservationDashboardQueryParamsAtom);

  // 드롭다운 버튼 클릭 시 열기/닫기
  const handleClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // 드롭다운 메뉴 클릭 시 닫기
  const handleClickMenu = (value: T) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault();
      const target = e.target as HTMLButtonElement;
      const newId = Number(target.id);
      setValue(value);
      setIsOpen(false);
      // ReservationDashboardQueryParams 업데이트
      setCalendarState((prev) => ({
        ...prev,
        activityId: newId,
      }));
    };
    return handleClick;
  };

  // 초기값으로 되돌리기
  const handleReset = () => setValue(initValue);

  return {
    value,
    isOpen,
    handleReset,
    onClickButton: handleClickButton,
    onBlurButton: () => setIsOpen(false),
    onClickMenu: handleClickMenu,
  };
};

export default useDropdown;
