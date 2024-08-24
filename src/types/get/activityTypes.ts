export type MyActivityList = MyActivity[];

export type MyActivity = {
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
};

export type SortType = 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';

export interface getActivityListParams {
  method: 'offset' | 'cursor';
  cursorId?: number;
  category?:
    | '전체'
    | '문화 · 예술'
    | '식음료'
    | '스포츠'
    | '투어'
    | '관광'
    | '웰빙'
    | '';
  keyword?: string;
  sort?: SortType;
  page: number;
  size: number;
}

export interface MainPageOptionTypes {
  [key: string]:
    | string
    | number
    | 'offset'
    | 'cursor'
    | SortType
    | '전체'
    | '문화 · 예술'
    | '식음료'
    | '스포츠'
    | '투어'
    | '관광'
    | '웰빙'
    | '';
}

export interface getActivityListResponse {
  activities: MyActivityList;
  totalCount: number;
  cursorId?: number;
}
