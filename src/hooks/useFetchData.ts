import { useQuery } from '@tanstack/react-query';
import { QueryKey, UseQueryResult } from '@tanstack/react-query';

interface Options {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  // 원하는 경우 기타 옵션 추가 가능
}

const useFetchData = <T>(
  queryKey: QueryKey,
  getService: () => Promise<{ data: T }>,
  options: Options,
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const response = await getService();
        return response.data;
      } catch (error) {
        // 에러 핸들링 가능
        throw error;
      }
    },
    ...options,
  });
};

export default useFetchData;
