import { Action, createReducer, on } from '@ngrx/store';
import { AuthenticationState, initialState } from './authentication.state';
import * as AuthenticationActions from './authentication.actions';

const authenticationReducer = createReducer(
  initialState,
  on(AuthenticationActions.login, (state) => ({
    ...state,
    loggingIn: true,
  })),
  on(AuthenticationActions.loginSuccess, (state) => ({
    ...state,
    isLoggedIn: true,
    loggingIn: false,
  })),
  on(AuthenticationActions.loginFailure, (state) => ({
    ...state,
    isLoggedIn: false,
    loggingIn: false,
  })),
  on(AuthenticationActions.signup, (state) => ({
    ...state,
    signingUp: true,
  })),
  on(AuthenticationActions.signupSuccess, (state, action) => ({
    ...state,
    isLoggedIn: true,
    signingUp: false,
    currentUser: action.user,
  })),
  on(AuthenticationActions.signupFailure, (state, action) => ({
    ...state,
    isLoggedIn: false,
    signingUp: false,
    error: action.error,
  }))
);

export function reducer(state: AuthenticationState | undefined, action: Action) {
  return authenticationReducer(state, action);
}
