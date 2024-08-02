import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import LeftNavBar from '@/components/common/LeftNavBar';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const isAuthPage =
    router.pathname === '/login' || router.pathname === '/signup';
  const isMainPage = router.pathname === '/';
  const isActivityPage = /^\/activity\/[^/]+$/.test(router.pathname);

  //로그인 정보, 유저 정보 받아오는 로직 필요
  const isLoggedIn = true;
  const currentUser = {
    id: 1,
    email: 'user@example.com',
    nickname: '김체리',
    profileImageUrl:
      'https://i.pinimg.com/564x/2e/79/91/2e79919eb6b27e2e994ccbf51cc4bf41.jpg',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  };

  if (isAuthPage) {
    return <main className="flex-1">{children}</main>;
  }

  if (isMainPage) {
    return (
      <div className="layout-container">
        <div className="layout-header-wrapper">
          <Header isLoggedIn={isLoggedIn} user={currentUser} />
        </div>
        <div className="layout-header-spacer" />
        <main className="flex-1">{children}</main>
        <div className="layout-content-margin-bottom" />
        <Footer />
      </div>
    );
  }

  if (isActivityPage) {
    return (
      <div className="layout-container">
        <div className="layout-header-wrapper">
          <Header isLoggedIn={isLoggedIn} user={currentUser} />
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
            <main className={`flex-1`}>{children}</main>
          </div>
        </div>
        <div className="layout-content-margin-bottom" />
        <Footer />
      </div>
    );
  }

  /* myPage */
  return (
    <div className="layout-container">
      <div className="layout-header-wrapper">
        <Header isLoggedIn={isLoggedIn} user={currentUser} />
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
          <div className="mr-4 hidden pc:block tablet:block">
            <LeftNavBar />
          </div>
          <main className={`flex-1`}>{children}</main>
        </div>
      </div>
      <div className="layout-content-margin-bottom" />
      <Footer />
    </div>
  );
}

export default MainLayout;
