import { useMediaQuery } from 'usehooks-ts';

import KVentureLogo from '@/assets/icons/logo_big.svg';
import KVentureMobileLogo from '@/assets/icons/logo_big_mobile.svg';
import { MOBILE_SIZE } from '@/constants/windowSize';

export default function AuthLayoutHeader() {
  const isMobile = useMediaQuery(MOBILE_SIZE);
  return <span>{isMobile ? <KVentureMobileLogo /> : <KVentureLogo />}</span>;
}
