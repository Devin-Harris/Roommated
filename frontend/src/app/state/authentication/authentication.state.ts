import { User } from '@rmtd/common/interfaces';

export interface AuthenticationState {
  isLoggedIn: boolean;
  loggingIn: boolean;
  signingUp: boolean;
  currentUser: User | null;
  errors: string[] | null;
}

export const initialState: AuthenticationState = {
  isLoggedIn: false,
  loggingIn: false,
  signingUp: false,
  currentUser: null,
  errors: null,
};
