import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import LeftNaviBar from '@/components/common/LeftNavBar';
import { Modal, useModal } from '@/components/common/Modal';
import {
  ACTIVITY_EDIT_PAGE_PATTERN,
  STATIC_PROTECTED_ROUTES,
} from '@/constants/routeConstants';

import Footer from './Footer';
import Header from './Header';

export default function PageWithLnb({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { openModal, modalProps } = useModal();

  useEffect(() => {
    const accessToken = getCookie('accessToken');

    if (
      !accessToken &&
      (STATIC_PROTECTED_ROUTES.includes(router.pathname) ||
        ACTIVITY_EDIT_PAGE_PATTERN.test(router.pathname))
    ) {
      openModal(
        'confirm',
        '로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?',
        {
          onConfirm: () => {
            window.location.href = '/login';
          },
          onCancel: () => {
            window.location.href = '/';
          },
        },
      );
    }
  });

  return (
    <>
      <div className="layout-container">
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
        <div className="bg-kv-gray-100 align-center">
          <div className="layout-content-container">
            <div className="mr-6 hidden pc:block tablet:block">
              <LeftNaviBar />
            </div>
            <main className="min-h-[1060px] flex-1 bg-kv-gray-100">
              {children}
            </main>
          </div>
        </div>
        <div className="layout-content-margin-bottom" />
        <Footer />
      </div>
      <Modal {...modalProps} />
    </>
  );
}
