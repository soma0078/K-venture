import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';

import { postLogin } from '@/lib/apis/postApis';
import { LogInForm, LogInResponse } from '@/types/post/loginTypes';

// NOTE: 로그인 성공시 쿠키에 토큰 저장, 실패시 에러 출력하는 훅
const useLogIn = () => {
  return useMutation<LogInResponse, unknown, LogInForm, unknown>({
    mutationFn: postLogin,
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        console.error(error.response?.data.message);
      } else {
        console.error('알 수 없는 오류가 발생했습니다.');
      }
    },
    onSuccess: (data) => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
    },
  });
};

export default useLogIn;
