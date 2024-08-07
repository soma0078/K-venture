import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import ErrorText from '@/components/common/ErrorText';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';
import Modal from '@/components/common/Modal/Modal';
import useModal from '@/hooks/useModal';
import { updateUserData } from '@/lib/apis/patchApis';
import { getUserProfile } from '@/lib/apis/userApis';

export interface UserProfile {
  nickname: string;
  email: string;
  password?: string;
  newPassword?: string;
  profileImageUrl?: string;
}

export default function EditProfileForm() {
  const queryClient = useQueryClient();
  const { modalType, message, isOpen, closeModal, openModal } = useModal();

  // 사용자 프로필 조회
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserProfile>({
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      newPassword: '',
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        nickname: userData.nickname,
        email: userData.email,
        password: '',
        newPassword: '',
      });
    }
  }, [userData, reset]);

  // 유저 데이터 업데이트 뮤테이션
  const mutation = useMutation<void, Error, Partial<UserProfile>>({
    mutationFn: async (updateData) => {
      return updateUserData(updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      openModal('alert', '프로필 정보를 성공적으로 수정했습니다.');
    },
    onError: (error) => {
      console.error('프로필 업데이트 실패:', error);
    },
  });

  // 프로필 정보 수정 요청
  const onSubmit = async (formData: UserProfile) => {
    const updateData: Partial<UserProfile> = {};

    // 닉네임 변경 여부
    if (formData.nickname && formData.nickname !== userData?.nickname) {
      updateData.nickname = formData.nickname;
    }

    // 비밀변호 변경 여부
    if (formData.newPassword) {
      updateData.newPassword = formData.newPassword;
    }

    if (Object.keys(updateData).length > 0) {
      try {
        await mutation.mutateAsync(updateData);
      } catch (error) {
        openModal('alert', '프로필 수정에 실패했습니다.');
      }
    } else {
      openModal('alert', '수정할 프로필 정보가 없습니다.');
    }
  };

  if (isLoading) return <p>로딩중입니다.</p>;
  if (isError)
    return <p>프로필 정보를 불러오는 데 실패했습니다: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-input-group">
          <Label
            htmlFor="nickname"
            className="profile-label custom-label-style"
          >
            닉네임
          </Label>
          <Input
            id="nickname"
            {...register('nickname', {
              maxLength: {
                value: 10,
                message: '닉네임은 10자 이하로 작성해주세요.',
              },
            })}
            autoComplete="off"
            className={`profile-input ${errors.nickname && 'profile-input-error'}`}
          />
          {errors.nickname && <ErrorText>{errors.nickname?.message}</ErrorText>}
        </div>
        <div className="profile-input-group">
          <Label htmlFor="email" className="profile-label custom-label-style">
            이메일
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className="profile-input profile-input-readonly"
            readOnly
          />
        </div>
        <div className="profile-input-group">
          <Label
            htmlFor="password"
            className="profile-label custom-label-style"
          >
            비밀번호
          </Label>
          <Input
            id="password"
            type="password"
            {...register('password', {
              minLength: {
                value: 8,
                message: '8자 이상 입력해 주세요',
              },
            })}
            placeholder="8자 이상 입력해 주세요"
            onBlur={() => trigger('password')}
            className={`profile-input ${errors.password && 'profile-input-error'}`}
          />
          {errors.password && <ErrorText>{errors.password?.message}</ErrorText>}
        </div>
        <div className="profile-input-group">
          <Label
            htmlFor="newPassword"
            className="profile-label custom-label-style"
          >
            비밀번호 재입력
          </Label>
          <Input
            id="newPassword"
            type="password"
            {...register('newPassword', {
              validate: (value) =>
                value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            onBlur={() => trigger('newPassword')}
            className={`profile-input ${errors.newPassword && 'profile-input-error'}`}
          />
          {errors.newPassword && (
            <ErrorText>{errors.newPassword?.message}</ErrorText>
          )}
        </div>
        <input
          type="submit"
          value="저장하기"
          className="save-btn z-1 absolute right-0 top-0"
          disabled={isSubmitting}
        />
      </form>

      <Modal
        type={modalType}
        message={message}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
}
