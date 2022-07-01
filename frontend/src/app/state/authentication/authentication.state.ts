import { User } from '@rmtd/common/interfaces';

export interface AuthenticationState {
  isLoggedIn: boolean;
  loggingIn: boolean;
  signingUp: boolean;
  currentUser: User | null;
  error: Error | null;
  reauthProcessed: boolean;
  loginFailAttempt: boolean;
}

export const initialState: AuthenticationState = {
  isLoggedIn: false,
  loggingIn: false,
  signingUp: false,
  currentUser: null,
  error: null,
  reauthProcessed: true,
  loginFailAttempt: false,
};
