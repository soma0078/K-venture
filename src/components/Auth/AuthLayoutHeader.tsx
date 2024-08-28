import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

import KVentureLogo from '@/assets/icons/logo_big.svg';
import KVentureMobileLogo from '@/assets/icons/logo_big_mobile.svg';
import { MOBILE_SIZE } from '@/constants/windowSize';

export default function AuthLayoutHeader() {
  const isMobile = useMediaQuery(MOBILE_SIZE);

  return (
    <Link href="/" onClick={() => redirect('/')}>
      {isMobile ? <KVentureMobileLogo /> : <KVentureLogo />}
    </Link>
  );
}
