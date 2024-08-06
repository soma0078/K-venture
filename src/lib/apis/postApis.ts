import { setCookie } from 'cookies-next';

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
