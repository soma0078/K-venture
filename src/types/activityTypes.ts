export interface MyActivityForm {
  title: string;
  category: CategoryType;
  description: string;
  price: number;
  address: string;
  schedules?: Schedule[];
  bannerImageUrl: string;
  subImages?: string[];
}

export interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export const CATEGORIES = {
  ART: '문화 예술',
  'F&B': '식음료',
  SPORT: '스포츠',
  TOUR: '투어',
  SIGHTSEEING: '관광',
  WELLBEING: '웰빙',
} as const;

export type CategoryType = (typeof CATEGORIES)[keyof typeof CATEGORIES];
