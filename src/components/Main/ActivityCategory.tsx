import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import { useAtom } from 'jotai';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { activityListOptions } from '@/state/activityListAtom';
import { MainPageOptionTypes } from '@/types/get/activityTypes';

import ActiveCategorySlide from './ActiveCategorySlide';
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

  return (
    <>
      <ul className="hidden pc:flex pc:gap-x-2 pc:pb-6 tablet:hidden">
        {Object.keys(categories).map((v) => {
          return (
            <li
              key={v}
              className={`flex w-[127px] cursor-pointer items-center justify-center rounded-xl border-[1px] border-kv-primary-blue-light px-4 py-3 kv-text-lg ${categories[v] === options.category ? 'bg-kv-blue text-white' : 'bg-white text-kv-black'}`}
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
      <ul className="relative flex max-h-[454px] w-[80%] rounded-xl pc:hidden tablet:flex tablet:px-[10px] mobile:px-[24px]">
        <Swiper
          spaceBetween={20}
          // effect={'fade'}
          slidesPerView={4}
          // modules={[EffectFade, Navigation]}
          modules={[Navigation]}
          navigation={{
            nextEl: '.category-swiper-button-next',
            prevEl: '.category-swiper-button-prev',
          }}
        >
          {Object.keys(categories).map((v) => {
            return (
              <SwiperSlide key={v}>
                <li
                  className={`flex w-[127px] cursor-pointer items-center justify-center rounded-xl border-[1px] border-kv-primary-blue-light py-3 kv-text-lg ${categories[v] === options.category ? 'bg-kv-blue text-white' : 'bg-white text-kv-black'}`}
                  onClick={() => {
                    setOptions({
                      ...options,
                      category: categories[v],
                    });
                  }}
                >
                  {categories[v]}
                </li>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="absolute z-10 hidden gap-x-2 px-2 pc:bottom-[-10px] pc:right-[20px] pc:flex tablet:bottom-[-10px] tablet:right-[40%] tablet:flex">
          <span className="category-swiper-button-prev flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-kv-primary-blue">
            &lt;
          </span>
          <span className="category-swiper-button-next flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-kv-primary-blue">
            &gt;
          </span>
        </div>
      </ul>
    </>
  );
}
