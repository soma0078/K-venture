import { setCookie } from 'cookies-next';
import { getCookie } from 'cookies-next';

import { UserProfile } from '@/components/userProfile/EditProfileForm';
import instance from '@/lib/apis/axios';
import { LogInForm, LogInResponse } from '@/types/post/loginTypes';

// access token을 업데이트 하기 위한 요청
export const updateAccessToken = async () => {
  const { data } = await instance.post('/auth/tokens');

  const newAccessToken = data.accessToken;
  setCookie('accessToken', newAccessToken);
};

// 로그인
export const postLogin = async (
  formData: LogInForm,
): Promise<LogInResponse> => {
  const response = await instance.post<LogInResponse>('/auth/login', formData);
  return response.data;
};

// 프로필 이미지 url 생성
export const token = getCookie('accessToken');

export const createPresignedUrl = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await instance.post<UserProfile>('/users/me/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.profileImageUrl;
};
