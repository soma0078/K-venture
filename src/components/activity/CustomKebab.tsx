import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import KebabContainer from '@/components/common/Kebab/KebabContainer';
import KebabDelete from '@/components/common/Kebab/KebabDelete';
import KebabLink from '@/components/common/Kebab/KebabLink';
import { Modal, useModal } from '@/components/common/Modal';
import { deleteActivity } from '@/lib/apis/deleteApis';
import { ErrorResponse } from '@/types/errorTypes';

export default function CustomKebab({ activityId }: { activityId: number }) {
  const router = useRouter();
  const { modalType, message, isOpen, closeModal, openModal } = useModal();

  const mutation = useMutation<void, AxiosError<ErrorResponse>>({
    mutationFn: () => deleteActivity(activityId),
  });

  const handleClickDelete = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        // 확인 클릭 시 메인 이동
        openModal('alert', '성공적으로 삭제되었습니다.', () => {
          router.push('/');
        });
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message || '네트워크 연결을 확인해주세요.';
        openModal('alert', errorMessage);
      },
    });
  };

  return (
    <>
      <KebabContainer>
        {/* TODO 체험 수정 페이지 url 추가 */}
        <KebabLink href="/">수정하기</KebabLink>
        <KebabDelete onClick={handleClickDelete}>삭제하기</KebabDelete>
      </KebabContainer>
      <Modal
        type={modalType}
        message={message}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
}
