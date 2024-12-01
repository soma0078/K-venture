import { useEffect, useState } from 'react';

import ArrowLeftIcon from '@/assets/icons/icon_arrow_left.svg';
import ArrowRightIcon from '@/assets/icons/icon_arrow_right.svg';

interface IPaginationProps {
  totalCount: number;
  currentPage: string | number;
  pageSize: number;
  onClick: (number: number) => void;
  groupSize: number;
}

/**
 * pagination 컴포넌트
 * @totalCount 전체 게시글 수 (api: totalCount)
 * @currentPage 현재 페이지 (api: page)
 * @pageSize 한 페이지에 보이는 게시글 수 (api: pageSize)
 * @onClick 버튼 클릭 이벤트 핸들 함수 (콜백으로 숫자 전달)
 * @groupSize 한 화면에 보이는 최대 페이지 버튼 수
 */
function MainPagination({
  totalCount,
  currentPage,
  pageSize,
  onClick,
  groupSize,
}: IPaginationProps) {
  const [pageGroup, setPageGroup] = useState(
    Math.ceil(Number(currentPage) / groupSize),
  );
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const totalPage =
    totalCount % pageSize > 0
      ? Math.floor(totalCount / pageSize) + 1
      : Math.floor(totalCount / pageSize);
  const isFirstNumber = currentPage === 1;
  const isLastNumber = currentPage === totalPage;

  let lastNum = pageGroup * groupSize;
  if (lastNum > totalPage) {
    lastNum = totalPage;
  }
  let firstNum = groupSize >= lastNum ? 1 : groupSize * (pageGroup - 1) + 1;

  const onClickNumberBtn: (number: number) => void = (value) => {
    onClick(value);
  };

  const onClickPrevBtn = () => {
    if (currentPage === firstNum) {
      setPageGroup(pageGroup - 1);
    }
    onClick(Number(currentPage) - 1);
  };

  const onClickNextBtn = () => {
    if (currentPage === lastNum) {
      setPageGroup(pageGroup + 1);
    }
    onClick(Number(currentPage) + 1);
  };

  useEffect(() => {
    setPageGroup(Math.ceil(Number(currentPage) / groupSize));
  }, [currentPage, groupSize]);

  useEffect(() => {
    const newPageNumbers = Array.from(
      { length: lastNum - firstNum + 1 },
      (_, index) => firstNum + index,
    );
    setPageNumbers(newPageNumbers);
  }, [pageGroup, firstNum, lastNum]);

  return (
    <div className="flex items-center justify-center gap-[10px] sm:mt-[30px] sm:gap-[15px]">
      <button
        disabled={isFirstNumber}
        className="pagination-btn"
        onClick={onClickPrevBtn}
      >
        <ArrowLeftIcon className="arrow-size" alt="이전 페이지" />
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onClickNumberBtn(num)}
          className={`pagination-btn ${num === currentPage ? 'active' : ''}`}
        >
          {num}
        </button>
      ))}
      <button
        type="button"
        onClick={onClickNextBtn}
        className="pagination-btn"
        disabled={isLastNumber}
      >
        <ArrowRightIcon className="arrow-size" alt="다음 페이지" />
      </button>
    </div>
  );
}

export default MainPagination;
