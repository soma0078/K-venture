import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import HeaderUserProfile from '@/components/common/HeaderUserProfile';

interface HeaderProps {
  isLoggedIn: boolean;
  user: {
    nickname: string;
    profileImageUrl: string | null;
  };
}

function Header({ isLoggedIn, user }: HeaderProps) {
  const handleNotificationClick = () => {
    //알림 컴포넌트 나오는 로직
  };

  return (
    <header className="flex items-center justify-center border-b border-gray-300 p-4">
      <div className="mx-5 flex h-[30px] w-full justify-between pc:w-[1200px] tablet:mx-6 tablet:w-full">
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
            <button className="" onClick={handleNotificationClick}>
              <Image
                src="/assets/icons/icon_notification.svg"
                alt="알림"
                width={20}
                height={20}
              />
            </button>
            <div className="mx-4 h-4/5 border-[1px] border-l border-kv-gray-300"></div>
            <Link href="/profile">
              <HeaderUserProfile
                nickname={user.nickname}
                profileImageUrl={user.profileImageUrl}
              />
            </Link>
          </div>
        ) : (
          <div className="flex w-[111px] justify-between">
            <Link href="/login">
              <span className={`${LINK_STYLES}`}>로그인</span>
            </Link>
            <Link href="/signup">
              <span className={`${LINK_STYLES}`}>회원가입</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

const LINK_STYLES =
  'cursor-pointer kv-text-md font-kv-medium text-kv-black hover:text-kv-gray-600 active:text-kv-gray-800 cursor:pointer';
