import { useCallback, useEffect, useState } from 'react';

import instance from '@/lib/apis/axios';
import { getMyReservations } from '@/lib/apis/getApis';
import { MyReservation } from '@/types/get/reservationTypes';

const useInfiniteScrollReservations = (initialStatus: string | null) => {
  const [reservations, setReservations] = useState<MyReservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursorId, setNextCursorId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [status, setStatus] = useState<string | null>(initialStatus);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMyReservations(nextCursorId, status, isFirstFetch);
      setReservations((prevReservations) =>
        isFirstFetch
          ? data.reservations
          : [...prevReservations, ...data.reservations],
      );
      setNextCursorId(data.cursorId);
      setIsFirstFetch(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  }, [nextCursorId, status, isFirstFetch]);

  const handleScroll = useCallback(() => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const threshold = document.documentElement.offsetHeight - 100;

    if (scrollPosition < threshold || loading || nextCursorId === null) {
      return;
    }
    fetchReservations();
  }, [loading, nextCursorId, fetchReservations]);

  useEffect(() => {
    setIsFirstFetch(true);
    fetchReservations();
  }, [status]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const updateStatus = (newStatus: string | null) => {
    setNextCursorId(null);
    setIsFirstFetch(true);
    setStatus(newStatus);
  };

  return {
    reservations,
    loading,
    error,
    setError,
    fetchReservations,
    updateStatus,
  };
};

export default useInfiniteScrollReservations;
