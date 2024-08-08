import { useState } from 'react';

import KebabIcon from '@/assets/icons/icon_kebab.svg';
import { KebabContainerProps } from '@/types/kebabTypes';

export default function KebabContainer({ children }: KebabContainerProps) {
  const [isKebabOpen, setIsKebabOpen] = useState<boolean>(false);

  const handleKebabClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setIsKebabOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setIsKebabOpen(false);
  };

  return (
    <div className="relative">
      <KebabIcon
        onClick={handleKebabClick}
        className="cursor-pointer"
        alt="케밥 아이콘"
      />
      {isKebabOpen && (
        <>
          <div
            onClick={handleClickOutside}
            className="fixed inset-0 z-10"
          ></div>
          <div
            className="absolute right-0 z-10 flex w-40 flex-col overflow-hidden rounded border border-kv-gray-300 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}
