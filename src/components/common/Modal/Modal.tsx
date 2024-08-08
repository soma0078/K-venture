import React from 'react';

import AlertModal from '@/components/common/Modal/CustomModals/AlertModal';
import ConfirmModal from '@/components/common/Modal/CustomModals/ConfirmModal';
import {
  CustomModalProps,
  MODAL_TYPES,
  ModalProps,
  ModalType,
} from '@/types/modalTypes';

import ModalContainer from './ModalContainer';

export default function Modal({ isOpen, onClose, message, type }: ModalProps) {
  // 조건부 랜더링을 위해 삼항연산자를 사용하지 않은 이유:
  // 모달이 계속 추가될 경우 import하고 객체에 추가하면 확장이 편리함
  const modalComponents: Record<
    ModalType,
    React.ComponentType<CustomModalProps>
  > = {
    [MODAL_TYPES.ALERT]: AlertModal,
    [MODAL_TYPES.CONFIRM]: ConfirmModal,
  };

  const ModalContent = modalComponents[type];

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      {() => (
        <div className="pointer-events-none fixed inset-0 z-20 align-center">
          <ModalContent onClose={onClose} message={message} />
        </div>
      )}
    </ModalContainer>
  );
}
