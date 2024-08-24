import { useAtom, useAtomValue } from 'jotai';

import SortDropDown from '@/components/common/Dropdown/SortDropdown';
import { roChecker } from '@/lib/utils/checkUnicode';
import { activityListOptions, listTotalCount } from '@/state/activityListAtom';

import ListNavTagList from './ActivityCategory';

const sortObjects: { [key: string]: 'price_asc' | 'price_desc' } = {
  '낮은 순': 'price_asc',
  '높은 순': 'price_desc',
};

export default function ExperienceListNavBar() {
  const [options, setOptions] = useAtom(activityListOptions);
  const totalCount = useAtomValue(listTotalCount);

  return (
    <div className="flex w-[100%] justify-between">
      {!options.keyword ? (
        <>
          <ListNavTagList />
          <span className="z-10">
            <SortDropDown
              label="가격"
              options={['낮은 순', '높은 순']}
              onSelect={(selectedValue) =>
                setOptions({ ...options, sort: sortObjects[selectedValue] })
              }
            />
          </span>
        </>
      ) : (
        <div className="flex flex-col">
          <h2 className="font-kv-regular kv-text-3xl">
            <span className="font-kv-bold">{options.keyword}</span>
            {roChecker(options.keyword.toString())} 검색한 결과입니다.
          </h2>
          <h2 className="font-kv-regular kv-text-md">
            총 {totalCount}개의 결과
          </h2>
        </div>
      )}
    </div>
  );
}
