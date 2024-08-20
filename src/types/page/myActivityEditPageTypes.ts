export interface ActivityDetailResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: { id: number; imageUrl: string }[];
  schedules: { id: number; date: string; startTime: string; endTime: string }[];
}

export interface UpdateActivityParams {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];
  scheduleIdsToRemove?: number[];
  schedulesToAdd?: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}
