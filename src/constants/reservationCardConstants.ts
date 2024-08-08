export const RESERVATION_TITLE = {
  date: '날짜',
  headCount: '인원',
} as const;

export type ReservationTitleKey = keyof typeof RESERVATION_TITLE;

export const RESERVATION_TIMESELECTOR_PLACEHOLDER = {
  noDate: '날짜를 선택해주세요.',
  title: '예약 가능한 시간',
} as const;

export const RESERVATION_PARTICIPANT_COUNTER_PLACEHOLDER = {
  mobile: '예약할 인원을 선택해주세요.',
  noMobile: '참여 인원 수',
} as const;

export const INITIAL_RESERVATION_STATE = {
  date: '',
  startTime: '',
  endTime: '',
  price: 0,
  headCount: 1,
  step: 1,
  isToggleModal: false,
  schedules: [],
  scheduleId: 0,
};
