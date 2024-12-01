import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { geocodeAddress } from '@/lib/apis/getApis';

interface KakaoMapProps {
  address: string;
}

// 기본 위치
const defaultPosition = { lat: 33.5563, lng: 126.79581 };

export default function KakaoMap({ address }: KakaoMapProps) {
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    async function updatePosition() {
      const coordinates = await geocodeAddress(address);

      if (coordinates) {
        setPosition(coordinates);
      }
    }

    updatePosition();
  }, [address]);

  return (
    <Map center={position} className="w-ful mb-2 h-[360px] rounded-2xl">
      <MapMarker
        position={position}
        image={{
          src: '/assets/icons/icon_symbol.svg',
          size: {
            width: 60,
            height: 60,
          },
        }}
      ></MapMarker>
    </Map>
  );
}
