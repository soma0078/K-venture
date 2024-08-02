import { User } from '@/types/userTypes';

export interface LogInForm {
  email: string;
  password: string;
}

export interface LogInResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
