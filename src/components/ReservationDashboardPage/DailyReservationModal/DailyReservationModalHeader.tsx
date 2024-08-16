import CloseIcon from '@/assets/icons/iocn_x_lg.svg';

interface DailyReservationModalHeaderProps {
  onClose: () => void;
}

export default function DailyReservationModalHeader({
  onClose,
}: DailyReservationModalHeaderProps) {
  return (
    <div className="mx-auto mt-[24px] flex h-[40px] w-[343px] items-center justify-between">
      <h1 className="text-kv-2xl font-kv-bold">예약 정보</h1>
      <CloseIcon className="size-[40px]" onClick={onClose} />
    </div>
  );
}
