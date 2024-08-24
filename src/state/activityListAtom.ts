import { atom } from 'jotai';

import {
  getActivityListParams,
  MainPageOptionTypes,
  MyActivityList,
} from '@/types/get/activityTypes';

export const activityListAtom = atom<MyActivityList>([]);

export const mostReviewedListAtom = atom<MyActivityList>([]);

export const activityListOptions = atom<MainPageOptionTypes>({
  method: 'offset',
  cursorId: 0,
  category: '',
  keyword: '',
  sort: 'latest',
  page: 1,
  size: 8,
});

export const listTotalCount = atom<number>(0);
