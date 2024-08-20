export interface NotificationResponse {
  totalCount: number;
  notifications: NotificationsType[];
  cursorId: number | null;
}

export interface NotificationsType {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
