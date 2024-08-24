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
