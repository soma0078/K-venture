import { useCallback, useEffect, useRef, useState } from 'react';

import { getActivities } from '@/lib/apis/getApis';
import { MyActivity } from '@/types/get/activityTypes';

import { useInfiniteScrollHandler } from './useInfiniteScrollHandler';

const useInfiniteScrollActivity = () => {
  const [activities, setActivities] = useState<MyActivity[]>([]);
  const [nextCursorId, setNextCursorId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  const fetchActivitiesData = useCallback(
    async (isReset: boolean = false) => {
      if (loadingRef.current) return;

      loadingRef.current = true;
      try {
        const data = await getActivities(isReset ? null : nextCursorId);
        setActivities((prev) =>
          isReset ? data.activities : [...prev, ...data.activities],
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
    [nextCursorId],
  );

  useEffect(() => {
    fetchActivitiesData(true);
  }, []);

  useInfiniteScrollHandler(
    fetchActivitiesData,
    !!nextCursorId,
    loadingRef.current,
  );

  return {
    activities,
    loading: loadingRef.current,
    error,
    setError,
    fetchActivitiesData,
  };
};

export default useInfiniteScrollActivity;
