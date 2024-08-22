export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUser extends User {
  password: string;
  newPassword: string;
}

export interface ProfileFormTypes {
  email?: string;
  nickname: string;
  password: string;
  newPassword: string;
}
