import React, { useState } from 'react';

import KebabContainer from '@/components/common/Kebab/KebabContainer';
import KebabDelete from '@/components/common/Kebab/KebabDelete';
import KebabLink from '@/components/common/Kebab/KebabLink';
import { MyActivity } from '@/types/get/activityTypes';

import MyCardContainer from './MyCardLayout';

type MyActivityCardProps = {
  activity: MyActivity;
  onDelete: () => void;
};

function MyActivityCard({ activity, onDelete }: MyActivityCardProps) {
  return (
    <MyCardContainer
      imageSrc={activity.bannerImageUrl}
      imageAlt={activity.title}
    >
      <div className="h-[78px] pc:h-[104px] tablet:h-[82px]">
        <div className="flex items-center">
          <img
            src="/assets/icons/icon_star.svg"
            alt="Twitter"
            className="mr-[6px] h-5 w-5 pb-[2px]"
          />
          <span className="text-kv-lg">
            {activity.rating} ({activity.reviewCount})
          </span>
        </div>
        <h3 className="activity-card-title">{activity.title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <p className="activity-card-price">
          ₩{activity.price.toLocaleString()}{' '}
          <span className="text-kv-gray-4b kv-text-md pc:kv-text-lg tablet:pc:kv-text-lg">
            /인
          </span>
        </p>
        <KebabContainer>
          <KebabLink href={`/activity/${activity.id}`}>수정하기</KebabLink>
          <KebabDelete onClick={onDelete}>삭제하기</KebabDelete>
        </KebabContainer>
      </div>
    </MyCardContainer>
  );
}

export default MyActivityCard;
