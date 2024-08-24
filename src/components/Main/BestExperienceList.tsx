/* eslint-disable */

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useActivityList from '@/hooks/useActivityList';
import { mostReviewedListAtom } from '@/state/activityListAtom';
import { MyActivityList } from '@/types/get/activityTypes';

import BestExperienceCard from './BestExperienceCard';

export default function BestExperienceList() {
  const [mostReviewedList, setMostReviewedList] =
    useAtom<MyActivityList>(mostReviewedListAtom);

  const mutation = useActivityList();

  const getBestExperienceData = async () => {
    const result = await mutation.mutateAsync({
      method: 'offset',
      sort: 'most_reviewed',
      page: 1,
      size: 10,
    });
    console.log(result.data);
    setMostReviewedList(result.data?.activities);
  };

  useEffect(() => {
    getBestExperienceData();
  }, []);

  return (
    <ul className="relative flex max-h-[454px] max-w-[696px] justify-center rounded-xl">
      <Swiper
        loop={true}
        spaceBetween={50}
        effect={'fade'}
        slidesPerView={1}
        modules={[EffectFade, Navigation]}
        navigation={{
          nextEl: '.review-swiper-button-next',
          prevEl: '.review-swiper-button-prev',
        }}
      >
        {mostReviewedList.map((data) => {
          return (
            <SwiperSlide key={`bestItem_${data.id}`}>
              <BestExperienceCard data={data} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="absolute z-10 hidden gap-x-2 px-2 pc:bottom-[-10px] pc:right-[20px] pc:flex tablet:bottom-[-10px] tablet:right-[40%] tablet:flex">
        <span className="review-swiper-button-prev flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-kv-primary-blue">
          &lt;
        </span>
        <span className="review-swiper-button-next flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-kv-primary-blue">
          &gt;
        </span>
      </div>
    </ul>
  );
}
