import CalendarIcon from '@/assets/icons/icon_calendar.svg';
import GearIcon from '@/assets/icons/icon_gear.svg';
import ListIcon from '@/assets/icons/icon_list.svg';
import ProfileIcon from '@/assets/icons/icon_user.svg';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    name: '내 정보',
    href: '/profile',
    icon: <ProfileIcon />,
  },
  {
    name: '예약 내역',
    href: '/my-reservations',
    icon: <ListIcon />,
  },
  {
    name: '내 체험 관리',
    href: '/my-activities',
    icon: <GearIcon />,
  },
  {
    name: '예약 현황',
    href: '/reservation-dashboard',
    icon: <CalendarIcon />,
  },
];
