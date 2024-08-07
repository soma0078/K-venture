import Link from 'next/link';
import { useRouter } from 'next/router';

import EditProfileImage from '@/components/userProfile/EditProfileImage';
import { MENU_ITEMS } from '@/constants/lnbMenuItems';

export default function LeftNaviBar() {
  const router = useRouter();

  return (
    <div className="w-full min-w-64 rounded-3xl border border-kv-gray-300 p-6 shadow-lg pc:min-w-96">
      {/* 프로필 이미지 컴포넌트 */}
      <EditProfileImage />

      {/* 네비게이션 메뉴 */}
      <div className="flex flex-col gap-2">
        {MENU_ITEMS.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.href}
              className={`lnb-link ${isActive ? 'lnb-link-active' : ''}`}
            >
              <span className="icon-size">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
