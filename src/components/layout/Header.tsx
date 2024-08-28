import { getCookie } from 'cookies-next';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import NotificationIcon from '@/assets/icons/icon_notification.svg';
import KVentureLogo from '@/assets/icons/logo_md.svg';
import HeaderUserProfile from '@/components/common/HeaderUserProfile';
import Loading from '@/components/common/Loading';
import NotificationModal from '@/components/myNotificatons/NotificationModal';
import useFetchData from '@/hooks/useFetchData';
import useResponsive from '@/hooks/useResponsive';
import useScrollLock from '@/hooks/useScrollLock';
import { getUserData } from '@/lib/apis/userApis';
import { nicknameAtom, profileImageAtom } from '@/state/profileAtom';
import { User } from '@/types/userTypes';

import { ProfileMenu } from './ProfileMenu';

function Header() {
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [profileImage, setProfileImage] = useAtom(profileImageAtom);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { isMobile } = useResponsive();
  useScrollLock({
    isOpen: isNotificationModalOpen,
    additionalCondition: isMobile,
  });

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

  useEffect(() => {
    if (user) {
      setProfileImage(user.profileImageUrl);
      setNickname(user.nickname);
    }
  }, [user, setProfileImage, setNickname]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="absolute left-[100px] top-[25px]">
        <Loading />
      </div>
    );
  }
  if (isError) {
    return <div>Err or loading user data: {error.message}</div>;
  }

  const handleProfileClick = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };
  const handleProfileMenuClose = () => {
    setIsProfileMenuOpen(false);
  };

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
            <KVentureLogo />
          </div>
        </Link>
        {isLoggedIn ? (
          <div className="flex h-full items-center">
            <button
              onClick={handleNotificationClick}
              onBlur={handleNotificationModalClose}
            >
              <NotificationIcon />
            </button>
            <div className="mx-4 h-4/5 border-[1px] border-l border-kv-gray-300"></div>
            {user && (
              <button
                onClick={handleProfileClick}
                onBlur={handleProfileMenuClose}
              >
                <HeaderUserProfile
                  nickname={nickname}
                  profileImageUrl={profileImage}
                />
              </button>
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
      {isProfileMenuOpen && (
        <ProfileMenu closeProfileMenu={handleProfileMenuClose} />
      )}
    </header>
  );
}

export default Header;
