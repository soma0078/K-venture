import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useMediaQuery, useWindowSize } from 'usehooks-ts';

import NoList from '@/assets/icons/icon_no_list.svg';
import { PC_SIZE, TABLET_SIZE } from '@/constants/windowSize';
import useActivityList from '@/hooks/useActivityList';
import {
  activityListAtom,
  activityListOptions,
  listTotalCount,
} from '@/state/activityListAtom';
import { MainPageOptionTypes, MyActivityList } from '@/types/get/activityTypes';

import KVentureSymbol from '../../../public/assets/icons/symbol.svg';
import ExperienceCard from './ExperienceCard';
import MainPagination from './MainPagination';

export default function ExperienceList() {
  const isPC = useMediaQuery(PC_SIZE);
  const isTablet = useMediaQuery(TABLET_SIZE);
  const [options, setOptions] =
    useAtom<MainPageOptionTypes>(activityListOptions);
  const [totalCount, setTotalCount] = useAtom(listTotalCount);
  const windowsSize = useWindowSize();
  const [size, setSize] = useState(8);

  const [activityList, setActivityList] =
    useAtom<MyActivityList>(activityListAtom);

  const mutation = useActivityList();

  const getArticleList = async () => {
    Object.entries(options).forEach(([key, value]) => {
      if (value === '' || value === 0 || !value) delete options[key];
    });
    const result = await mutation.mutateAsync(options);
    setActivityList(result.data.activities);
    setTotalCount(result.data.totalCount);
    setSize(() => {
      return !options.keyword
        ? isPC
          ? 8
          : isTablet
            ? 9
            : 4
        : isPC
          ? 16
          : isTablet
            ? 9
            : 8;
    });
  };

  const handlePaginationClick = (pageNum: number) => {
    setOptions((prev) => ({ ...prev, page: pageNum }));
  };

  useEffect(() => {
    getArticleList();
  }, [options]);

  useEffect(() => {
    setOptions({ ...options, size: size, page: 1 });
  }, [size, windowsSize]);

  return (
    <div className="flex w-[100%] flex-col gap-y-1">
      <div className={`flex gap-x-2 pb-6 ${options.keyword && 'hidden'}`}>
        <KVentureSymbol />
        <h2 className="font-kv-bold kv-text-2xl">모든 체험</h2>
      </div>
      {activityList.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <NoList />
          <h3 className="text-kv-xl font-kv-bold pc:kv-text-3xl tablet:kv-text-3xl">
            체험 리스트가 존재하지 않습니다
          </h3>
        </div>
      ) : (
        <ul
          className={`tablet:grid-row-3 grid-max-rows-2 pc:grid-max-rows-2 grid grid-cols-2 gap-4 pc:grid-cols-4 tablet:grid-cols-3`}
        >
          {activityList.map((v) => {
            return <ExperienceCard key={v.id} data={v} />;
          })}
        </ul>
      )}
      {activityList.length > 0 && options.page && (
        <MainPagination
          totalCount={totalCount}
          currentPage={options.page}
          pageSize={size}
          onClick={handlePaginationClick}
          groupSize={5}
        />
      )}
    </div>
  );
}
