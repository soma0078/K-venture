import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import HeaderUserProfile from '@/components/common/HeaderUserProfile';
import NotificationModal from '@/components/myNotificatons/NotificationModal';
import useFetchData from '@/hooks/useFetchData';
import useScrollLock from '@/hooks/useScrollLock';
import { getUserData } from '@/lib/apis/userApis';
import { User } from '@/types/userTypes';

function Header() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  useScrollLock({ isOpen: isNotificationModalOpen });

  const accessToken = getCookie('accessToken');
  const {
    data: user,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useFetchData<User>(['userInfo', accessToken], getUserData, {
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
  const isLoggedIn = isSuccess;

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading user data: {error.message}</div>;
  }

  const handleNotificationClick = () => {
    setIsNotificationModalOpen((prev) => !prev);
  };

  const handleNotificationModalClose = () => {
    setIsNotificationModalOpen(false);
  };

  return (
    <header className="h-[70px] border-b border-gray-300 bg-white p-4 align-center">
      <div className="layout-content-container h-[30px] justify-between">
        <Link href="/">
          <div className="mr-10 flex cursor-pointer items-center">
            <Image
              src="/assets/icons/logo_md.svg"
              alt="K-Venture 로고"
              width={165}
              height={28}
            />
          </div>
        </Link>
        {isLoggedIn ? (
          <div className="flex h-full items-center">
            <button
              onClick={handleNotificationClick}
              onBlur={handleNotificationModalClose}
            >
              <Image
                src="/assets/icons/icon_notification.svg"
                alt="알림"
                width={20}
                height={20}
              />
            </button>
            <div className="mx-4 h-4/5 border-[1px] border-l border-kv-gray-300"></div>
            {user && (
              <Link href="/profile">
                <HeaderUserProfile
                  nickname={user.nickname}
                  profileImageUrl={user.profileImageUrl}
                />
              </Link>
            )}
          </div>
        ) : (
          <div className="flex w-[111px] justify-between">
            <Link href="/login">
              <span className="header-link-styles">로그인</span>
            </Link>
            <Link href="/signup">
              <span className="header-link-styles">회원가입</span>
            </Link>
          </div>
        )}
      </div>
      {isNotificationModalOpen && (
        <NotificationModal
          closeNotificationModal={handleNotificationModalClose}
        />
      )}
    </header>
  );
}

export default Header;
