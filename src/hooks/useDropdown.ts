import { useSetAtom } from 'jotai';
import { MouseEventHandler, useState } from 'react';

import {
  dailyReservationModalAtom,
  reservationDashboardQueryParamsAtom,
} from '@/state/reservationDashboardAtom';
// 값 선택 드롭다운 관리를 위한 훅
const useDropdown = <T>(initValue: T) => {
  const [value, setValue] = useState(initValue);
  const [isOpen, setIsOpen] = useState(false);
  const setCalendarState = useSetAtom(reservationDashboardQueryParamsAtom);
  const setDailyModalState = useSetAtom(dailyReservationModalAtom);

  // 드롭다운 버튼 클릭 시 열기/닫기
  const handleClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // handleClickMenu 핸들러에서 실행할 추가 함수
  const updateCalendarState = (id: number) => {
    setCalendarState((prev) => ({
      ...prev,
      activityId: id,
    }));
  };

  const updateDailyModalState = (id: number) => {
    setDailyModalState((prev) => ({
      ...prev,
      activityId: id,
    }));
  };

  // 드롭다운 메뉴 클릭 시 닫기
  const handleClickMenu = (value: T) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = ({
      currentTarget,
    }) => {
      const id = Number(currentTarget.id);

      setValue(value);
      setIsOpen(false);

      updateCalendarState(id);
      updateDailyModalState(id);
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
