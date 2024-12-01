import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import NoList from '@/assets/icons/icon_no_list.svg';
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

    setMostReviewedList(result.data?.activities);
  };

  useEffect(() => {
    getBestExperienceData();
  }, []);

  return (
    <>
      {mostReviewedList.length > 0 ? (
        <ul className="relative flex max-h-[454px] w-[335px] max-w-[640px] justify-center rounded-[24px] shadow-[8px_18px_15px_0px_#00000024] pc:mx-[28px] pc:w-[640px] tablet:w-[640px]">
          <Swiper
            loop={true}
            spaceBetween={50}
            effect={'fade'}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, EffectFade, Navigation]}
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
          <div className="absolute z-10 hidden gap-x-2 px-2 pc:bottom-[-10px] pc:right-[10%] pc:flex tablet:bottom-[-10px] tablet:right-[40%] tablet:flex">
            <span className="review-swiper-button-prev flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white font-kv-bold text-kv-primary-blue">
              &lt;
            </span>
            <span className="review-swiper-button-next flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white font-kv-bold text-kv-primary-blue">
              &gt;
            </span>
          </div>
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center px-[40px]">
          <NoList />
          <h3 className="word-break text-kv-md font-kv-bold pc:kv-text-3xl tablet:kv-text-3xl">
            체험 리스트가 존재하지 않습니다
          </h3>
        </div>
      )}
    </>
  );
}
