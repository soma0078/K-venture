import Link from 'next/link';
import { useRouter } from 'next/router';

import UserProfile from '@/components/userProfile/UploadProfile';
import { MENU_ITEMS } from '@/constants/lnbMenuItems';

export default function LeftNaviBar() {
  const router = useRouter();

  return (
    <div className={LNB_STYLES.wrapper}>
      {/* TODO 프로필 이미지 불러오기 */}
      <UserProfile initialProfile="" />
      <div className="flex flex-col gap-2">
        {MENU_ITEMS.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.href}
              className={`${LNB_STYLES.link} ${LNB_STYLES.hover} ${isActive ? LNB_STYLES.active : ''}`}
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

const LNB_STYLES = {
  wrapper:
    'w-full max-w-[360px] rounded-3xl border border-kv-gray-300 p-6 shadow-lg',
  link: 'flex gap-3.5 rounded-xl fill-current px-5 py-2.5 font-kv-semibold text-kv-gray-600 transition ease-in-out',
  active: 'bg-kv-primary-blue-light text-kv-primary-blue',
  hover: 'hover:bg-kv-primary-blue-light hover:text-kv-primary-blue',
};
