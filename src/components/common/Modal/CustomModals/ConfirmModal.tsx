import CheckIcon from 'public/assets/icons/icon_check.svg';

import Button from '@/components/common/Button';
import { BUTTON_TEXTS, DEFAULT_MESSAGES } from '@/constants/modalConstants';
import { CustomModalProps } from '@/types/modalTypes';

export default function ConfirmModal({ message, onClose }: CustomModalProps) {
  return (
    <div className="modal-container h-[184px] w-[298px]">
      <CheckIcon className="absolute mx-auto mt-[24px] h-6 w-full" />
      <div className="modal-content">
        <p className="modal-text max-h-[48px]">
          {message || DEFAULT_MESSAGES.CONFIRM}
        </p>
      </div>
      <Button
        type="button"
        onClick={onClose}
        className={`modal-button-common left-[65px] border-2 border-kv-primary-blue bg-white py-0 text-kv-lg text-kv-primary-blue hover:border-kv-blue hover:bg-kv-gray-200`}
      >
        {BUTTON_TEXTS.NO}
      </Button>
      <Button
        type="button"
        onClick={onClose}
        className={`modal-button-common right-[65px] bg-kv-primary-blue py-0 text-kv-md font-kv-bold text-white hover:bg-kv-blue`}
      >
        {BUTTON_TEXTS.YES}
      </Button>
    </div>
  );
}
