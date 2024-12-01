import { onMouseDown } from '@/components/myNotificatons/NotificationModal';
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
    <div onMouseDown={onMouseDown}>
      <div
        className="fixed inset-0 z-30 bg-kv-black opacity-70"
        onClick={handleBackdropClick}
      />
      {children()}
    </div>
  );
}
