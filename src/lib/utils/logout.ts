import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');

    if (!router.pathname.startsWith('/activity')) {
      router.push('/');
    }
  };

  return logout;
};
