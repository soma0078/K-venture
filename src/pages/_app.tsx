import '@/styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useState } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const pretendard = localFont({
  src: '../../public/static/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function App({ Component, pageProps }: AppProps) {
  // Next.js에서는 페이지를 이동하면 App 컴포넌트부터 새롭게 렌더링되기 때문에
  // 쿼리 클라이언트가 매번 새롭게 생성되는 것을 막기 위하여 state로 저장
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 보통 SSR에서는 staleTime을 0 이상으로 해줌으로써
            // 클라이언트 사이드에서 바로 다시 데이터를 refetch 하는 것을 피한다.
            // * default 값은 0
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${pretendard.variable} font-pretendard`}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
