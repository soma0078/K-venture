import { format } from 'date-fns';

interface ReviewItemProps {
  createdAt: string;
  content: string;
}

export default function ReviewItem({ createdAt, content }: ReviewItemProps) {
  return (
    <>
      <p>{format(new Date(createdAt), 'yyyy. M. d')}</p>
      <p>{content}</p>
    </>
  );
}
