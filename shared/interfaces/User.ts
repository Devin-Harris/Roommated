import { Gender } from '../enums';

export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  birthdate?: Date;
  password?: string;
  profileImageUrl?: string;
  bio?: string;
  gender?: Gender;
  isAdmin?: boolean;
}

export interface AuthenticatedUser {
  user: User;
  access_token: string;
}
