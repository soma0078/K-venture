import { useState } from 'react';

import { ModalType } from '@/types/ModalTypes';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState<ModalType>('alert');

  const openModal = (modalType: ModalType, newMessage: string) => {
    setModalType(modalType);
    setMessage(newMessage);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage('');
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
