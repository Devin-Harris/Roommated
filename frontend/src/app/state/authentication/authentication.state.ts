import { User } from '@rmtd/common/interfaces';

const testingCurrentUser = {
  id: 1,
  firstname: 'Devin',
  lastname: 'Harris',
  profileImageUrl: undefined,
};

export interface AuthenticationState {
  isLoggedIn: boolean;
  loggingIn: boolean;
  signingUp: boolean;
  currentUser: User | null;
  error: Error | null;
}

export const initialState: AuthenticationState = {
  isLoggedIn: false,
  loggingIn: false,
  signingUp: false,
  currentUser: testingCurrentUser,
  error: null,
};
