import { User } from '@rmtd/common/interfaces'

export interface AuthenticationState {
  isLoggedIn: boolean;
  loggingIn: boolean;
  currentUser: User | null
}

export const initialState: AuthenticationState = {
  isLoggedIn: false,
  loggingIn: false,
  currentUser: null
};
