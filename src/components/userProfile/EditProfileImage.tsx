import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';

import PenIcon from '@/assets/icons/icon_pen.svg';
import Loading from '@/components/common/Loading';
import { Modal, useModal } from '@/components/common/Modal';
import { DEFAULT_PROFILE_IMAGE } from '@/constants/defaultAssets';
import useFetchData from '@/hooks/useFetchData';
import { updateUserData } from '@/lib/apis/patchApis';
import { postProfileImage } from '@/lib/apis/postApis';
import { getUserData } from '@/lib/apis/userApis';
import { profileImageAtom } from '@/state/profileAtom';

export default function EditProfileImage() {
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useAtom(profileImageAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { openModal, modalProps } = useModal();

  const { data } = useFetchData(['userProfile'], getUserData, {});

  const mutation = useMutation({
    mutationFn: async (profileImageUrl: string) => {
      await updateUserData({ profileImageUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const presignedUrl = await postProfileImage({ image: file });

        if (presignedUrl) {
          const profileUrl = presignedUrl.split('?')[0];
          setProfileImage(profileUrl);

          openModal('confirm', '저장하시겠습니까?', {
            onConfirm: () => {
              mutation.mutate(profileUrl);
            },
            onCancel: () => {
              setProfileImage(data?.profileImageUrl || DEFAULT_PROFILE_IMAGE);
            },
          });
        }
      } catch (error) {
        openModal('alert', '이미지 업로드하는데 실패했습니다.');
        console.error('이미지 업로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (data && data.profileImageUrl) {
      setProfileImage(data.profileImageUrl);
    }
  }, [data]);

  return (
    <>
      <form className="relative m-auto mb-6 h-40 w-40">
        <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-lg">
          <Image
            src={profileImage}
            alt={`${data?.nickname}의 프로필 이미지`}
            fill
            priority
          />
        </div>

        <label htmlFor="uploadProfileImage">
          <span className="absolute bottom-0 right-0 z-10 cursor-pointer rounded-full bg-kv-primary-blue p-2.5 transition-all hover:scale-110">
            <PenIcon />
          </span>
        </label>

        <input
          id="uploadProfileImage"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleImageChange}
        />

        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-50">
            <Loading />
          </div>
        )}
      </form>
      <Modal {...modalProps} />
    </>
  );
}
