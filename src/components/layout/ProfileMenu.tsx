import Link from 'next/link';

import { onMouseDown } from '@/components/myNotificatons/NotificationModal';
import useResponsive from '@/hooks/useResponsive';
import { useLogout } from '@/lib/utils/logout';

interface ProfileMenuProps {
  closeProfileMenu: () => void;
}

export function ProfileMenu({ closeProfileMenu }: ProfileMenuProps) {
  const { isMobile } = useResponsive();
  const logout = useLogout();

  const profileLink = isMobile ? '/profile-menu' : '/profile';

  const handleLogout = () => {
    logout();
    closeProfileMenu();
  };

  const handleLinkClick = () => {
    closeProfileMenu();
  };

  return (
    <div
      className="absolute top-[62px] m-auto w-full max-w-[1200px]"
      onMouseDown={onMouseDown}
    >
      <div className="absolute right-0 flex flex-col rounded-lg border border-kv-gray-400 bg-white">
        <Link href={profileLink} className="gnb-link" onClick={handleLinkClick}>
          내 정보
        </Link>
        <Link
          href="/my-reservations"
          className="gnb-link"
          onClick={handleLinkClick}
        >
          예약 내역
        </Link>
        <Link
          href="/my-activities"
          className="gnb-link"
          onClick={handleLinkClick}
        >
          내 체험 관리
        </Link>
        <Link
          href="/reservation-dashboard"
          className="gnb-link"
          onClick={handleLinkClick}
        >
          예약 현황
        </Link>
        <button className="gnb-link" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
