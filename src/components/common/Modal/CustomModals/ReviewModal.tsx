import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import CloseIcon from '@/assets/icons/iocn_x_lg.svg';
import Button from '@/components/common/Button';
import StarRating from '@/components/MyReservationsPage/StarRating';
import { getActivity } from '@/lib/apis/getApis';
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
  const [activityExists, setActivityExists] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        await getActivity(reservation.activity.id);
      } catch (error) {
        setActivityExists(false);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [reservation.activity.id]);

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

  if (loading) {
    return (
      <div className="review-modal-container">
        <div className="flex h-[686px] w-[432px] flex-col items-center justify-center">
          <h2 className="font-kv-bold text-kv-gray-600 kv-text-xl">
            로딩 중...
          </h2>
        </div>
      </div>
    );
  }

  if (!activityExists) {
    return (
      <div className="review-modal-container">
        <div className="flex h-[686px] w-[432px] flex-col items-center justify-center">
          <h2 className="mb-4 font-kv-bold kv-text-2xl">체험을 찾을 수 없음</h2>
          <p className="mb-10 mt-3 text-center font-kv-regular kv-text-md">
            이 체험은 삭제되었거나 더 이상 존재하지 않아 리뷰를 남길 수
            없습니다.
          </p>
          <Button
            type="button"
            className="btn-blue mt-6 h-[56px] w-full"
            onClick={() => onClose()}
          >
            닫기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-modal-container">
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
