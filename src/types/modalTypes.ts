import { ReactNode } from 'react';

export interface CustomModalProps {
  message?: string;
  onClose: () => void;
}

export interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: () => ReactNode;
}

export interface ModalProps extends CustomModalProps {
  isOpen: boolean;
  type: 'alert' | 'confirm';
}

export const MODAL_TYPES = {
  ALERT: 'alert',
  CONFIRM: 'confirm',
} as const;

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];
