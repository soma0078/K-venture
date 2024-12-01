import { ReactNode } from 'react';

import { MyReservation } from './get/reservationTypes';

export interface CustomModalProps {
  message?: string;
  onClose: (choice?: 'yes' | 'no') => void;
  reservation?: MyReservation | null;
}

export interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: () => ReactNode;
}

export interface ModalProps extends CustomModalProps {
  isOpen: boolean;
  type: 'alert' | 'confirm' | 'review';
}

export const MODAL_TYPES = {
  ALERT: 'alert',
  CONFIRM: 'confirm',
  REVIEW: 'review',
} as const;

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];

export interface ModalCallbacks {
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}
