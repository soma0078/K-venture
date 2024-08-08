import { useState } from 'react';

import { ModalType } from '@/types/modalTypes';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState<ModalType>('alert');
  const [onCloseCallback, setOnCloseCallback] = useState<() => void>();

  const openModal = (
    modalType: ModalType,
    newMessage: string,
    onClose?: () => void,
  ) => {
    setModalType(modalType);
    setMessage(newMessage);
    setIsOpen(true);
    setOnCloseCallback(() => onClose);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage('');
    if (onCloseCallback) {
      onCloseCallback();
    }
  };

  return {
    isOpen,
    message,
    openModal,
    closeModal,
    modalType,
  };
};

export default useModal;
