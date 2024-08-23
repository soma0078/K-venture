import { useRouter } from 'next/router';

import MyActivityCard from '@/components/common/ActivityCard/MyActivityCard';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import { Modal } from '@/components/common/Modal';
import useInfiniteScrollActivity from '@/hooks/useInfiniteScrollActivity';
import useModal from '@/hooks/useModal';
import { deleteActivity } from '@/lib/apis/deleteApis';
import { ErrorResponse } from '@/types/errorTypes';

export default function MyActivityList() {
  const router = useRouter();
  const { activities, loading, error, setError, fetchActivitiesData } =
    useInfiniteScrollActivity();

  const { modalProps: deleteModalProps, openModal: openDeleteModal } =
    useModal();
  const { modalProps: errorModalProps, openModal: openErrorModal } = useModal();

  const handleDeleteActivity = async (activityId: number) => {
    try {
      await deleteActivity(activityId);
      await fetchActivitiesData(true);
    } catch (error) {
      const err = error as ErrorResponse;
      const errorMessage = err.message;
      openErrorModal('alert', errorMessage);
    }
  };

  const handleDeleteButtonClick = (activityId: number) => {
    openDeleteModal('confirm', '체험을 삭제하시겠습니까?', {
      onConfirm: () => handleDeleteActivity(activityId),
    });
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="mb-4 flex h-[53px] w-full items-center justify-between">
        <h1 className="font-kv-bold kv-text-3xl">내 체험 관리</h1>
        <Button
          type="button"
          className="btn-blue h-[48px] w-[120px]"
          onClick={() => router.push('/my-activity')}
        >
          체험 등록하기
        </Button>
      </div>
      {activities.length === 0 && !loading ? (
        <EmptyState message="아직 등록한 체험이 없어요" />
      ) : (
        <div>
          {activities.map((activity) => (
            <MyActivityCard
              key={activity.id}
              activity={activity}
              onDelete={() => handleDeleteButtonClick(activity.id)}
            />
          ))}
        </div>
      )}
      {loading && <div>Loading more activities...</div>}
      <Modal {...deleteModalProps} />
      <Modal {...errorModalProps} />
    </div>
  );
}
