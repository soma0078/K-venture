import instance from './axios';

export const deleteActivity = async (activityId: number) => {
  await instance.delete(`/my-activities/${activityId}`);
};

export const deleteNotification = async (notificationId: number) => {
  await instance.delete(`/my-notifications/${notificationId}`);
};
