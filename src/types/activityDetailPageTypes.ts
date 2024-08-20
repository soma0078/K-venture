export interface CardEventHandlerType {
  handleModalToggle: () => void;
  handleCalendarClick: (date: string) => void;
  handleHeadCountChange: (value: number) => void;
  handleCloseClick: () => void;
  handleNextStepClick: () => void;
  stepInit: () => void;
  handleTimeChange: (
    startTime: string,
    endTime: string,
    scheduleId: number,
  ) => void;
}

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

type Schedules = Schedule[];

export interface ReservationStateType {
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  headCount: number;
  step: number;
  isToggleModal: boolean;
  schedules: Schedules;
  scheduleId: number;
}

export interface ActivityResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrls: { id: number; imageUrl: string }[];
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationRequest {
  scheduleId: number;
  headCount: number;
}
