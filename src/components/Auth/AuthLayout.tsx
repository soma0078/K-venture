import { PropsWithChildren } from 'react';

import AuthLayoutFooter from './AuthLayoutFooter';
import AuthLayoutHeader from './AuthLayoutHeader';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-3 mb-3 mt-16 flex max-w-[640px] flex-col items-center gap-6 pc:mx-auto pc:mt-[118px] tablet:mx-auto tablet:mt-[86px]">
      <AuthLayoutHeader />
      {children}
      <AuthLayoutFooter />
    </div>
  );
}
