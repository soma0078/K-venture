import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ErrorText from '@/components/common/ErrorText';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';
import { useModal } from '@/components/common/Modal';
import Modal from '@/components/common/Modal/Modal';
import useFetchData from '@/hooks/useFetchData';
import { updateUserData } from '@/lib/apis/patchApis';
import { getUserData } from '@/lib/apis/userApis';
import { nicknameAtom } from '@/state/profileAtom';
import { ProfileFormTypes } from '@/types/userTypes';

export default function EditProfileForm() {
  const queryClient = useQueryClient();
  const { modalProps, openModal } = useModal();
  const [nickname, setNickname] = useAtom(nicknameAtom);

  const { data: userData, isError } = useFetchData(
    ['userProfile'],
    getUserData,
    {},
  );

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormTypes>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (userData) {
      reset({
        nickname: userData.nickname,
        email: userData.email,
      });
    }
  }, [userData, reset]);

  const mutation = useMutation<void, Error, Partial<ProfileFormTypes>>({
    mutationFn: async (updateData) => {
      return updateUserData(updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      openModal('alert', '프로필 정보를 성공적으로 수정했습니다.');
    },
    onError: (error) => {
      openModal('alert', '프로필 업데이트에 실패했습니다.');
      console.error('프로필 업데이트 실패:', error);
    },
  });

  const onSubmit: SubmitHandler<ProfileFormTypes> = async (formData) => {
    const updateData: Partial<ProfileFormTypes> = {};

    if (formData.nickname !== userData?.nickname) {
      updateData.nickname = formData.nickname;
      setNickname(formData.nickname);
    }

    if (formData.newPassword) {
      updateData.newPassword = formData.newPassword;
    }

    if (Object.keys(updateData).length > 0) {
      try {
        await mutation.mutateAsync(updateData);
      } catch {
        openModal('alert', '프로필 수정에 실패했습니다.');
      }
    } else {
      openModal('alert', '수정할 프로필 정보가 없습니다.');
    }
  };

  if (isError) return <p>프로필 정보를 불러오는 데 실패했습니다</p>;

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
              required: '닉네임을 입력해주세요',
              maxLength: {
                value: 10,
                message: '10자 이하로 입력해주세요',
              },
              pattern: {
                value: /^\S+$/,
                message: '닉네임에 공백을 포함할 수 없습니다',
              },
            })}
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
            className="profile-input"
            disabled
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
                message: '8자 이상 입력해주세요',
              },
            })}
            placeholder="새로운 비밀번호를 입력해주세요"
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
                value === watch('password') || '비밀번호가 일치하지 않습니다',
            })}
            placeholder="비밀번호를 한 번 더 입력해주세요"
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

      <Modal {...modalProps} />
    </>
  );
}
