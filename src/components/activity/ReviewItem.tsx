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
    <>
      <Image
        src={profileImageUrl}
        width={45}
        height={45}
        className="rounded-full"
        alt={`${nickname} 프로필 이미지`}
      />

      <div>
        <p>{nickname}</p> |<p>{format(new Date(createdAt), 'yyyy. M. d')}</p>
        <p>{content}</p>
      </div>
    </>
  );
}
