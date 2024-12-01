import { useMutation } from '@tanstack/react-query';

import { getActivityList } from '@/lib/apis/getApis';
import {
  getActivityListResponse,
  MainPageOptionTypes,
} from '@/types/get/activityTypes';

// NOTE: 체험 리스트에 대한 데이터를 불러오는 뮤테이션
const useActivityList = () => {
  return useMutation<
    { data: getActivityListResponse },
    Error,
    MainPageOptionTypes,
    Error
  >({
    mutationFn: getActivityList,
    onError: (error: Error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      return data;
    },
  });
};

export default useActivityList;
