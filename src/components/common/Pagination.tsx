import ArrowLeftIcon from '@/assets/icons/icon_arrow_left.svg';
import ArrowRightIcon from '@/assets/icons/icon_arrow_right.svg';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps) {
  const PAGE_GROUP_SIZE = 5;

  // 현재 페이지 그룹과 페이지 번호 배열 생성
  const currentGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="flex justify-center gap-2">
      <button
        disabled={currentPage === 1}
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ArrowLeftIcon className="arrow-size" alt="이전 페이지" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ArrowRightIcon className="arrow-size" alt="다음 페이지" />
      </button>
    </div>
  );
}
