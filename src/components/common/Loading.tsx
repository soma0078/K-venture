import dynamic from 'next/dynamic';
import React from 'react';

import loading from '@/assets/icons/icon_loading.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Loading = ({ width = 30, height = 30 }) => {
  return (
    <div className="align-center">
      <Lottie
        animationData={loading}
        loop={true}
        autoplay={true}
        style={{ width: width, height: height }}
      />
    </div>
  );
};

export default Loading;
