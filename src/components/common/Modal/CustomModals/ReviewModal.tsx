import Image from 'next/image';
import React, { useState } from 'react';

import CloseIcon from '@/assets/icons/iocn_x_lg.svg';
import Button from '@/components/common/Button';
import StarRating from '@/components/MyReservationsPage/StarRating';
import { postReview } from '@/lib/apis/postApis';
import { CustomModalProps } from '@/types/modalTypes';

export default function ReviewModal({
  reservation,
  onClose,
}: CustomModalProps) {
  if (!reservation || !reservation.activity) {
    return null;
  }

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async () => {
    if (rating === 0 || reviewText.trim() === '') {
      setError('별점과 후기를 모두 작성해주세요.');
      return;
    }

    try {
      const response = await postReview(reservation.id, {
        rating,
        content: reviewText,
      });
      onClose('yes');
    } catch (error) {
      setError('후기 제출 중 문제가 발생했습니다. ');
    }
  };

  return (
    <div className="modal-container h-[750px] w-[480px] rounded-[24px] align-center">
      <div className="h-[686px] w-[432px]">
        <div className="flex h-10 w-full items-center justify-between">
          <h2 className="font-kv-bold kv-text-2xl">후기 작성</h2>
          <div className="h-7 w-7 cursor-pointer" onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>

        <div className="mt-[41px] flex h-[605px] flex-col justify-between">
          <div className="flex h-[126px] w-full items-center">
            <div className="relative h-[126px] w-[126px] rounded-[12px]">
              <Image
                src={reservation.activity.bannerImageUrl}
                alt={reservation.activity.title}
                layout="fill"
                objectFit="cover"
                className="rounded-[12px]"
              />
            </div>
            <div className="ml-6 flex h-full w-[271px] flex-col justify-between">
              <h3 className="activity-card-title">
                {reservation.activity.title}
              </h3>
              <p className="font-kv-regular text-kv-gray-700 kv-text-xs pc:kv-text-lg tablet:kv-text-md">
                {reservation.date} ・ {reservation.startTime} -{' '}
                {reservation.endTime}・ {reservation.headCount}명
              </p>
              <div className="h-[1px] w-[282px] bg-kv-black opacity-10"></div>
              <p className="font-kv-bold kv-text-3xl">
                ₩{reservation.totalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          <StarRating rating={rating} onRatingChange={setRating} />

          <textarea
            className="h-[240px] w-full resize-none rounded border border-kv-gray-79 p-4 focus:border-2 focus:border-kv-primary-blue focus:outline-none"
            rows={4}
            placeholder="후기를 작성해주세요"
            value={reviewText}
            onChange={handleReviewChange}
          />

          {error && <p className="mt-2 text-kv-red kv-text-xs">{error}</p>}

          <Button
            type="button"
            className="btn-blue h-[56px] w-full"
            onClick={handleSubmit}
          >
            작성하기
          </Button>
        </div>
      </div>
    </div>
  );
}
