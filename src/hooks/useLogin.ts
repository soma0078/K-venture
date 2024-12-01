import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import { postLogin } from '@/lib/apis/postApis';
import { LogInForm, LogInResponse } from '@/types/AuthTypes';
import { ModalCallbacks, ModalType } from '@/types/modalTypes';

// NOTE: 로그인 성공시 쿠키에 토큰 저장, 실패시 에러 출력하는 훅
const useLogIn = (
  callback: (
    modalType: ModalType,
    newMessage: string,
    newCallbacks?: ModalCallbacks,
  ) => void,
) => {
  const router = useRouter();

  return useMutation<LogInResponse, Error, LogInForm, Error>({
    mutationFn: postLogin,
    onError: (error: Error) => {
      callback('alert', error.message);
    },
    onSuccess: (data) => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      router.push('/');
    },
  });
};

export default useLogIn;
