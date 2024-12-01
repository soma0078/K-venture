import { useState } from 'react';

import KebabIcon from '@/assets/icons/icon_kebab.svg';
import { KebabContainerProps } from '@/types/kebabTypes';

export default function KebabContainer({ children }: KebabContainerProps) {
  const [isKebabOpen, setIsKebabOpen] = useState<boolean>(false);

  const handleKebabClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setIsKebabOpen((prev) => !prev);
  };

  const handleBlur = () => {
    setIsKebabOpen(false);
  };

  return (
    <div className="relative" tabIndex={0} onBlur={handleBlur}>
      <KebabIcon
        className="cursor-pointer"
        alt="케밥 아이콘"
        onClick={handleKebabClick}
      />
      {isKebabOpen && (
        <div
          className="absolute right-0 z-10 flex w-40 flex-col overflow-hidden rounded border border-kv-gray-300 bg-white shadow-lg"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
