import instance from './axios';

// 유저 정보 수정 요청 함수
export const updateUserData = async (
  formData: Partial<{
    nickname: string;
    newPassword: string;
    profileImageUrl: string;
  }>,
) => {
  const res = await instance.patch('/users/me', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};
