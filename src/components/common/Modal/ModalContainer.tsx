import useScrollLock from '@/hooks/useScrollLock';
import { ModalContainerProps } from '@/types/modalTypes';

export default function ModalContainer({
  children,
  isOpen,
  onClose,
}: ModalContainerProps) {
  useScrollLock({ isOpen: isOpen });

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-10 bg-kv-black opacity-70"
        onClick={handleBackdropClick}
      />
      {children()}
    </>
  );
}
