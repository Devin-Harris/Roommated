export interface AuthenticationState {
  isLoggedIn: boolean,
  loggingIn: boolean
}

export const initialState: AuthenticationState = {
  isLoggedIn: false,
  loggingIn: false
};