import {
  keepPreviousData,
  QueryKey,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface TotalCountResponse {
  totalCount: number;
}

interface UsePaginationOptions<T> {
  queryKey: QueryKey;
  queryFn: (page: number) => Promise<T>;
  pageLimit?: number;
  initialPage?: number;
}

const PAGE_LIMIT = 3;

/**
 * 페이지네이션 관리 훅
 *
 * @param options - 페이지네이션 설정
 * @returns 페이지 정보와 데이터
 */
export function usePagination<T extends TotalCountResponse>({
  queryKey,
  queryFn,
  pageLimit = PAGE_LIMIT,
  initialPage = 1,
}: UsePaginationOptions<T>) {
  const [page, setPage] = useState(initialPage);
  const queryClient = useQueryClient();

  const { data, isPlaceholderData } = useQuery({
    queryKey: [...queryKey, page],
    queryFn: () => queryFn(page),
    placeholderData: keepPreviousData,
  });

  const totalPages = data ? Math.ceil(data.totalCount / pageLimit) : 1;

  useEffect(() => {
    if (!isPlaceholderData && page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: [...queryKey, page + 1],
        queryFn: () => queryFn(page + 1),
      });
    }
  }, [isPlaceholderData, page, queryClient, queryKey, queryFn, totalPages]);

  return {
    page,
    setPage,
    totalPages,
    data,
    isPlaceholderData,
  };
}
