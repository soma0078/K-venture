// (드롭다운)내 체험 리스트 조회
export interface MyActivitiesResponse {
  activities: MyActivity[];
  totalCount: number;
  cursorId: null;
}

// (드롭다운)내 체험 리스트 조회
export interface MyActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AvailableValues {
  id: number;
  title: string;
}

// (달력)내 체험 월별 등록 현황
export interface ReservationDashboardResponse {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

// 달력에 표시할 정보 요청에 필요한 params를 전역 상태로 종합
export interface ReservationDashboardQueryParamsType {
  activityId: number;
  year: string;
  month: string;
}

// 예약 정보 모달 정보 요청 params를 전역 상태로 종합
export interface DailyReservationModalType {
  activityId: number;
  date: string;
  status: 'pending' | 'confirmed' | 'declined';
  scheduleId: number;
}
