import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

import CloseIcon from '@/assets/icons/icon_x_lg.svg';
import { deleteNotification } from '@/lib/apis/deleteApis';

interface NotificationProps {
  content: string;
  updatedAt: string;
  notificationId: number;
  refetchNotifications: () => void;
}

export default function Notification({
  content,
  updatedAt,
  notificationId,
  refetchNotifications,
}: NotificationProps) {
  const timeAgo = formatDistanceToNow(new Date(updatedAt), {
    addSuffix: true,
    locale: ko,
  });

  const highlightContent = (content: string): React.ReactNode => {
    return content.split(/(승인|거절)/).map((text, index) => {
      const textColor =
        text === '승인' ? 'text-kv-blue' : text === '거절' ? 'text-kv-red' : '';

      return (
        <span key={index} className={textColor}>
          {text}
        </span>
      );
    });
  };

  const highlightedContent = highlightContent(content);

  const handleDelete = async () => {
    await deleteNotification(notificationId);
    refetchNotifications();
  };

  const isApproved = content.includes('승인');
  const isRejected = content.includes('거절');

  return (
    <div className="relative mb-2 rounded-[5px] border border-kv-gray-400 bg-white px-3 py-4">
      <span
        className={`block h-[5px] w-[5px] rounded ${
          isApproved ? 'bg-kv-blue' : isRejected ? 'bg-kv-red' : ''
        }`}
      />
      <p className={`mt-4 break-keep text-kv-md`}>{highlightedContent}</p>
      <span className="text-kv-xs text-kv-gray-600">{timeAgo}</span>
      <button
        className="absolute right-3 top-3 text-kv-gray-a1"
        onClick={handleDelete}
      >
        <CloseIcon className="icon-size" />
      </button>
    </div>
  );
}
