export type Activity = {
  bannerImageUrl: string;
  title: string;
  id: number;
};

/* 내 예약 리스트 조회 */
export type MyReservation = {
  id: number;
  teamId: string;
  userId: number;
  activity: Activity;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};
