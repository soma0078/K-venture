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

export interface SignUpForm {
  email: string;
  nickname: string;
  password: string;
  password_confirm: string;
}

export interface SignUpResponse extends User {}
