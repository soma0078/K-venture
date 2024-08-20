import Button from '@/components/common/Button';
import { BUTTON_TEXTS, DEFAULT_MESSAGES } from '@/constants/modalConstants';
import { CustomModalProps } from '@/types/modalTypes';

export default function AlertModal({ message, onClose }: CustomModalProps) {
  return (
    <div className="modal-container h-[220px] w-[327px] pc:h-[250px] pc:w-[540px] tablet:h-[250px] tablet:w-[540px]">
      <div className="modal-content">
        <p className="modal-text max-h-[96px] pc:text-kv-2lg tablet:text-kv-2lg">
          {message || DEFAULT_MESSAGES.ALERT}
        </p>
      </div>
      <Button
        className="absolute inset-x-0 bottom-[28px] m-auto h-[42px] w-[138px] rounded-[8px] bg-kv-primary-blue py-0 text-kv-md font-kv-medium text-white hover:bg-kv-blue pc:right-[28px] pc:mr-0 pc:text-kv-lg tablet:right-[28px] tablet:mr-0 tablet:text-kv-lg"
        onClick={() => onClose('yes')}
      >
        {BUTTON_TEXTS.CONFIRM}
      </Button>
    </div>
  );
}
