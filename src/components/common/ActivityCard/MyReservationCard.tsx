import React from 'react';

import Button from '@/components/common/Button';
import { MyReservation } from '@/types/get/reservationTypes';

import MyCardContainer from './MyCardLayout';

type MyReservationCardProps = {
  reservation: MyReservation;
  onReviewClick: () => void;
  onCancelClick: () => void;
};

function MyReservationCard({
  reservation,
  onReviewClick,
  onCancelClick,
}: MyReservationCardProps) {
  const getStatusTextAndColor = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: '예약 완료', color: 'text-kv-blue-light' };
      case 'confirmed':
        return { text: '예약 승인', color: 'text-kv-orange' };
      case 'declined':
        return { text: '예약 거절', color: 'text-kv-orange-lighter' };
      case 'canceled':
        return { text: '예약 취소', color: 'text-kv-gray-700' };
      case 'completed':
        return { text: '체험 완료', color: 'text-kv-gray-700' };
      default:
        return { text: '', color: 'text-kv-gray-700' };
    }
  };

  const { text: statusText, color: statusColor } = getStatusTextAndColor(
    reservation.status,
  );

  return (
    <MyCardContainer
      imageSrc={reservation.activity.bannerImageUrl}
      imageAlt={reservation.activity.title}
    >
      <div className="flex h-[78px] flex-col justify-between pc:h-[104px] tablet:h-[82px]">
        <div
          className={`font-kv-bold kv-text-md pc:kv-text-lg tablet:kv-text-lg ${statusColor}`}
        >
          {statusText}
        </div>
        <h3 className="activity-card-title">{reservation.activity.title}</h3>
        <p className="font-kv-regular text-kv-gray-700 kv-text-xs pc:kv-text-2lg tablet:kv-text-md">
          {reservation.date} ・ {reservation.startTime} - {reservation.endTime}
          ・ {reservation.headCount}명
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="activity-card-price">
          ₩{reservation.totalPrice.toLocaleString()}
        </p>
        {reservation.status === 'pending' && (
          <Button
            type="button"
            className="activity-reservation-card-button border border-kv-primary-blue text-kv-primary-blue hover:bg-kv-gray-200 active:bg-kv-gray-300"
            onClick={onCancelClick}
          >
            예약 취소
          </Button>
        )}
        {reservation.status === 'completed' && !reservation.reviewSubmitted && (
          <Button
            type="button"
            className="btn-blue activity-reservation-card-button"
            onClick={onReviewClick}
          >
            후기 작성
          </Button>
        )}
      </div>
    </MyCardContainer>
  );
}

export default MyReservationCard;
