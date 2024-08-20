import CloseIcon from '@/assets/icons/icon_x_lg.svg';
import useNotificationsInfinite from '@/hooks/useNotificationsInfinite';
import useResponsive from '@/hooks/useResponsive';

import Notification from './Notification';

interface NotificationProps {
  closeNotificationModal: () => void;
}

export const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) =>
  e.preventDefault();

export default function NotificationModal({
  closeNotificationModal,
}: NotificationProps) {
  const { isMobile } = useResponsive();

  const { notifications, totalCount, ref, isFetchingNextPage, refetch } =
    useNotificationsInfinite();

  return (
    <div
      className="absolute top-[82px] m-auto w-full max-w-[1200px] bg-slate-500 mobile:fixed mobile:top-0 mobile:h-full"
      onMouseDown={onMouseDown}
    >
      <div
        className={`notification-modal-base ${isMobile ? 'notification-modal-mobile' : 'notification-modal-pc'} `}
      >
        <div className="mb-4 flex justify-between">
          <h2 className="text-kv-xl font-kv-semibold">알림 {totalCount}개</h2>
          <button onClick={closeNotificationModal}>
            <CloseIcon className="icon-size" />
          </button>
        </div>
        <ul
          className={`overflow-y-scroll-custom scrollbar-none-custom sm:max-h-[408px] ${isMobile ? 'notification-ul' : ''}`}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li key={notification.id} ref={ref} className="list-none">
                <Notification
                  content={notification.content}
                  updatedAt={notification.updatedAt}
                  notificationId={notification.id}
                  refetchNotifications={refetch}
                />
              </li>
            ))
          ) : (
            <p>알림이 없습니다.</p>
          )}
          {isFetchingNextPage && <div className="align-center">Loading...</div>}
        </ul>
      </div>
    </div>
  );
}
