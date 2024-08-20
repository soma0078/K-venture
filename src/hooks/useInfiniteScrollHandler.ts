import { useCallback, useEffect } from 'react';

export const useInfiniteScrollHandler = (
  fetchMoreData: () => void,
  hasMore: boolean,
  loading: boolean,
  threshold: number = 100,
) => {
  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;
    const threshold = 100;

    if (scrollPosition >= documentHeight - threshold && !loading && hasMore) {
      fetchMoreData();
    }
  }, [fetchMoreData, hasMore, loading, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};
