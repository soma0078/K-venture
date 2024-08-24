import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import {
  ACTIVITY_EDIT_PAGE_PATTERN,
  ACTIVITY_PAGE_PATTERN,
  AUTH_PAGES,
  STATIC_PROTECTED_ROUTES,
} from '@/constants/routeConstants';

import PageWithLnb from './PageWithLnb';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const isAuthPage = AUTH_PAGES.includes(router.pathname);
  const isActivityPage = ACTIVITY_PAGE_PATTERN.test(router.pathname);
  const isLnbPage =
    STATIC_PROTECTED_ROUTES.includes(router.pathname) ||
    ACTIVITY_EDIT_PAGE_PATTERN.test(router.pathname);

  if (isAuthPage) {
    return <main className="flex-1">{children}</main>;
  }

  if (isActivityPage) {
    return (
      <div className="kv-layout-root">
        <div className="layout-content-wrapper">
          <div className="layout-header-wrapper">
            <Header />
          </div>
          <div className="layout-header-spacer" />
          <div
            style={{
              height:
                'min(72px, calc(24px + (72 - 24) * ((100vw - 1200px) / (1920 - 1200))))',
            }}
            className="layout-content-margin-top"
          />
          <div className="align-center">
            <div className="layout-content-container">
              <main className="min-h-[1060px] flex-1 bg-kv-gray-100">
                {children}
              </main>
            </div>
          </div>
          <div className="layout-content-margin-bottom" />
          <Footer />
        </div>
      </div>
    );
  }

  if (isLnbPage) {
    return <PageWithLnb children={children} />;
  }

  return (
    <div className="layout-container">
      <div className="layout-header-wrapper">
        <Header />
      </div>
      <div className="layout-header-spacer" />
      <main className="flex-1 bg-kv-gray-100">{children}</main>
      <div className="layout-content-margin-bottom" />
      <Footer />
    </div>
  );
}

export default MainLayout;
