import { MouseEventHandler, useState } from 'react';

// 값 선택 드롭다운 관리를 위한 훅
const useDropdown = <T>(initValue: T) => {
  const [value, setValue] = useState(initValue);
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 버튼 클릭 시 열기/닫기
  const handleClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // 드롭다운 메뉴 클릭 시 닫기
  const handleClickMenu = (value: T) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault();
      setValue(value);
      setIsOpen(false);
    };
    return handleClick;
  };

  return {
    value,
    isOpen,
    onClickButton: handleClickButton,
    onBlurButton: () => setIsOpen(false),
    onClickMenu: handleClickMenu,
  };
};

export default useDropdown;
