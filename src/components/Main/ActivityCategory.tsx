import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import { useAtom } from 'jotai';
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'usehooks-ts';

import { TABLET_SIZE } from '@/constants/windowSize';
import { activityListOptions } from '@/state/activityListAtom';
import { MainPageOptionTypes } from '@/types/get/activityTypes';

const categories: MainPageOptionTypes = {
  all: '전체',
  culture: '문화 · 예술',
  food: '식음료',
  sports: '스포츠',
  tour: '투어',
  visit: '관광',
  wellbeing: '웰빙',
} as const;

export default function ActivityCategory() {
  const [options, setOptions] = useAtom(activityListOptions);
  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const isTablet = useMediaQuery(TABLET_SIZE);

  return (
    <>
      <ul className="hidden pc:flex pc:gap-x-2 pc:pb-6 tablet:hidden">
        {Object.keys(categories).map((v) => {
          return (
            <li
              key={v}
              className={`flex w-[127px] cursor-pointer items-center justify-center rounded-xl border-[1px] border-kv-primary-blue-light px-4 py-3 kv-text-lg ${categories[v] === options.category || (!options.category && categories[v] === '전체') ? 'bg-kv-blue text-white' : 'bg-white text-kv-black'}`}
              onClick={() => {
                setOptions({
                  ...options,
                  category: categories[v] === '전체' ? '' : categories[v],
                  page: 1,
                });
              }}
            >
              {categories[v]}
            </li>
          );
        })}
      </ul>
      <ul className="relative flex max-h-[454px] w-[80%] min-w-[260px] rounded-xl pr-[16px] pc:hidden tablet:flex tablet:px-[10px]">
        <div
          className={`category-swiper-button-prev absolute left-[-3px] top-[12px] z-10 flex hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-solid bg-white font-kv-bold text-kv-primary-blue pc:flex tablet:${isPrev ? 'flex' : 'hidden'}`}
        >
          &lt;
        </div>
        <Swiper
          spaceBetween={isTablet ? 5 : 10}
          // effect={'fade'}
          slidesPerView={isTablet ? 4 : 3}
          // modules={[EffectFade, Navigation]}
          modules={[Navigation]}
          navigation={{
            nextEl: '.category-swiper-button-next',
            prevEl: '.category-swiper-button-prev',
          }}
          onActiveIndexChange={(swiper) => {
            if (swiper.realIndex === 0) {
              setIsPrev(false);
            } else if (swiper.realIndex === swiper.slides.length - 4) {
              setIsNext(false);
            } else {
              setIsPrev(true);
              setIsNext(true);
            }
          }}
        >
          {Object.keys(categories).map((v) => {
            return (
              <SwiperSlide key={v}>
                <li
                  className={`relative flex h-[41px] w-[80px] cursor-pointer items-center justify-center gap-x-8 overflow-hidden rounded-xl border-[1px] border-kv-primary-blue-light py-3 pc:h-[57px] pc:w-[127px] pc:kv-text-lg tablet:h-[57px] tablet:w-[127px] tablet:gap-x-14 ${categories[v] === options.category || (!options.category && categories[v] === '전체') ? 'bg-kv-blue text-white' : 'bg-white text-kv-black'}`}
                  onClick={() => {
                    setOptions({
                      ...options,
                      category: categories[v] === '전체' ? '' : categories[v],
                      page: 1,
                    });
                  }}
                >
                  {categories[v]}
                </li>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          className={`category-swiper-button-next absolute right-[3px] top-[12px] z-10 hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-solid bg-white font-kv-bold text-kv-primary-blue pc:flex tablet:${isNext ? 'flex' : 'hidden'}`}
        >
          &gt;
        </div>
      </ul>
    </>
  );
}
