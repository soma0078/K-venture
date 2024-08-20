import ChevronDown from '@/assets/icons/icon_arrow_down.svg';

export default function InfiniteScrollHint({
  hasNextPage,
}: {
  hasNextPage: boolean;
}) {
  return (
    <div className="mt-[10px]">
      {hasNextPage && (
        <div className="align-center">
          <ChevronDown className="size-6 animate-bounce" />
        </div>
      )}
    </div>
  );
}
