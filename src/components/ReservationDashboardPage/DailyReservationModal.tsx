import { useAtomValue } from 'jotai';

import useDailyReservationData from '@/hooks/useDailyReservationData';
import { dailyReservationModalAtom } from '@/state/reservationDashboardAtom';

export default function DailyReservationModal() {
  const { reservationStatus, reservationDetails } = useDailyReservationData();
  const dailyModalState = useAtomValue(dailyReservationModalAtom);

  return (
    <div className="absolute left-[20px] top-[300px] z-10 h-[697px] w-[429px] rounded-3xl border border-kv-gray-400 bg-white shadow-lg">
      <div className="mx-auto mt-[24px] h-[40px] w-[381px] border border-gray-300">
        타이틀과 닫기 버튼
      </div>
      <div className="mt-[27px] flex h-[42px] w-full items-center border-b border-b-kv-gray-300 pl-[21px]">
        <div className="status-tap-base status-active">
          신청{reservationStatus?.[0]?.count.pending}
        </div>
        <div className="status-tap-base">
          승인{reservationStatus?.[0]?.count.confirmed}
        </div>
        <div className="status-tap-base">
          거절{reservationStatus?.[0]?.count.declined}
        </div>
      </div>
      <div className="mx-auto mt-[27px] h-[130px] w-[381px] border border-kv-gray-300">
        <p>예약 날짜</p>
        <p>{dailyModalState.date}</p>
        <p>
          {reservationStatus?.[0]?.startTime} ~{' '}
          {reservationStatus?.[0]?.endTime}
        </p>
      </div>
      <div className="mx-auto mt-[27px] h-[294px] w-[381px] border border-kv-gray-300">
        {reservationDetails?.reservations.map(({ nickname, headCount }) => {
          return (
            <>
              <div>닉네임: {nickname}</div>
              <div>인원: {headCount}</div>
            </>
          );
        })}
      </div>
    </div>
  );
}
