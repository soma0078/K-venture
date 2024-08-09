import { useCallback, useState } from 'react';

import { ModalCallbacks, ModalType } from '@/types/modalTypes';

/**
 * 모달 상태와 관련 함수를 관리하는 커스텀 훅
 *
 * @returns {{
 *   modalProps: { isOpen: boolean, message: string, type: ModalType, onClose: () => void },
 *   openModal: (modalType: ModalType, newMessage: string, newCallbacks?: ModalCallbacks) => void
 * }}
 *
 * @example
 * // 훅 사용 예시
 * const { modalProps, openModal } = useModal();
 *
 * // Modal 컴포넌트에 props 전달
 * <Modal {...modalProps} />
 */
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState<ModalType>('alert');
  const [callbacks, setCallbacks] = useState<ModalCallbacks>({});

  /**
   * 모달을 열고 설정합니다.
   * @param {ModalType} modalType - 모달의 유형 ('alert' 또는 'confirm')
   * @param {string} newMessage - 모달에 표시할 메시지
   * @param {ModalCallbacks} [newCallbacks] - 모달 동작에 대한 콜백 함수들
   *
   * @example
   * // 알림 모달 열기
   * openModal('alert', '작업이 완료되었습니다.');
   *
   * @example
   * // 확인 모달 열기 (콜백 포함)
   * openModal('confirm', '정말로 삭제하시겠습니까?', {
   *   onConfirm: () => console.log('삭제 확인'),
   *   onCancel: () => console.log('삭제 취소')
   * });
   *
   * @example
   * // 확인 모달 열기 (콜백 미포함)
   * openModal('confirm', '정말로 삭제하시겠습니까?');
   */
  const openModal = (
    modalType: ModalType,
    newMessage: string,
    newCallbacks: ModalCallbacks = {},
  ) => {
    setModalType(modalType);
    setMessage(newMessage);
    setCallbacks(newCallbacks);
    setIsOpen(true);
  };

  const closeModal = useCallback(
    (choice?: 'yes' | 'no'): void => {
      setIsOpen(false);
      if (choice === 'yes' && callbacks.onConfirm) {
        try {
          callbacks.onConfirm();
        } catch (error) {
          console.error('확인 콜백 실행 중 오류 발생:', error);
        }
      } else if (choice === 'no' && callbacks.onCancel) {
        try {
          callbacks.onCancel();
        } catch (error) {
          console.error('취소 콜백 실행 중 오류 발생:', error);
        }
      }
      setCallbacks({});
    },
    [callbacks],
  );

  return {
    modalProps: { isOpen, message, type: modalType, onClose: closeModal },
    openModal,
  };
};

export default useModal;
