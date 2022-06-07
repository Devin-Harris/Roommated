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
    errors: convertErrorToErrorsArray(action.error),
  }))
);

function convertErrorToErrorsArray(error: any): string[] {
  console.log('effect error', error);
  if (error.error) {
    const innerError = error.error;
    if (innerError.message instanceof Array) {
      return innerError.message;
    } else {
      if (typeof innerError === 'string') {
        try {
          const parsed = JSON.parse(innerError);
          return [parsed.message];
        } catch {}
      }
      return [innerError.message];
    }
  }

  if (error.message) {
    return [error.message];
  }

  return error;
}

export function reducer(state: AuthenticationState | undefined, action: Action) {
  return authenticationReducer(state, action);
}
