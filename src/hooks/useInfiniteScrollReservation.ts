import { useCallback, useEffect, useRef, useState } from 'react';

import { getMyReservations } from '@/lib/apis/getApis';
import { MyReservation } from '@/types/get/reservationTypes';

import { useInfiniteScrollHandler } from './useInfiniteScrollHandler';

const useInfiniteScrollReservation = (initialStatus: string | null) => {
  const [reservations, setReservations] = useState<MyReservation[]>([]);
  const [nextCursorId, setNextCursorId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(initialStatus);
  const loadingRef = useRef(false);

  const fetchReservations = useCallback(
    async (isResetFetch: boolean = false) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      try {
        const data = await getMyReservations(
          isResetFetch ? null : nextCursorId,
          status,
        );
        setReservations((prevReservations) =>
          isResetFetch
            ? data.reservations
            : [...prevReservations, ...data.reservations],
        );
        setNextCursorId(data.cursorId);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        loadingRef.current = false;
      }
    },
    [nextCursorId, status],
  );

  useInfiniteScrollHandler(
    fetchReservations,
    !!nextCursorId,
    loadingRef.current,
  );

  useEffect(() => {
    fetchReservations(true);
  }, [status]);

  const updateStatus = (newStatus: string | null) => {
    setNextCursorId(null);
    setStatus(newStatus);
  };

  return {
    reservations,
    loading: loadingRef.current,
    error,
    setError,
    fetchReservations,
    updateStatus,
  };
};

export default useInfiniteScrollReservation;
