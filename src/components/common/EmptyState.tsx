import Image from 'next/image';

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <Image
        src="/assets/images/empty_img.png"
        alt="빈 상태 이미지"
        width={240}
        height={240}
        className="mb-4 h-[200px] w-[200px] pc:h-[240px] pc:w-[240px]"
      />
      <p className="text-kv-gray-79 kv-text-2xl">{message}</p>
    </div>
  );
}
