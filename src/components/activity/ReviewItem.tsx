import { format } from 'date-fns';
import Image from 'next/image';

interface ReviewItemProps {
  createdAt: string;
  content: string;
  nickname: string;
  profileImageUrl: string;
}

export default function ReviewItem({
  createdAt,
  content,
  nickname,
  profileImageUrl,
}: ReviewItemProps) {
  return (
    <div className="my-6 flex gap-4 border-b border-kv-gray-300 pb-6 last:border-none">
      <div className="relative h-11 w-11 min-w-11">
        <Image
          src={profileImageUrl}
          fill
          objectFit="cover"
          className="rounded-full"
          alt={`${nickname} 프로필 이미지`}
        />
      </div>
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="font-semibold">{nickname}</span>
          <span className="inline-block h-3 w-[1px] bg-kv-blue"></span>
          <span className="font-light text-kv-gray-600">
            {format(new Date(createdAt), 'yyyy. M. d')}
          </span>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
}
