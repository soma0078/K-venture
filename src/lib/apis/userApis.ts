import { User } from '@/types/userTypes';

import instance from './axios';

export const getUserData = async (): Promise<{ data: User }> => {
  const URL = '/users/me';

  try {
    const response = await instance.get(URL);
    if (response.data) {
      return { data: response.data };
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<{
  nickname: string;
  email: string;
  profileImageUrl: string;
}> => {
  const response = await instance.get('/users/me');
  return response.data;
};
