import React, { useEffect } from 'react';

import { ModalContainerProps } from '@/types/Modaltypes';

export default function ModalContainer({
  children,
  isOpen,
  onClose,
}: ModalContainerProps) {
  // 모달 아래 페이지 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-kv-black opacity-70"
        onClick={handleBackdropClick}
      />
      {children()}
    </>
  );
}
