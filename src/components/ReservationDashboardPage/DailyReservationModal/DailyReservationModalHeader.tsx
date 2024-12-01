import CloseIcon from '@/assets/icons/icon_x_lg.svg';

interface DailyReservationModalHeaderProps {
  onClose: () => void;
}

export default function DailyReservationModalHeader({
  onClose,
}: DailyReservationModalHeaderProps) {
  return (
    <div className="mx-[16px] mt-[24px] flex h-[40px] min-w-[343px] items-center justify-between">
      <h1 className="text-kv-2xl font-kv-bold">예약 정보</h1>
      <CloseIcon className="size-[40px] cursor-pointer" onClick={onClose} />
    </div>
  );
}
