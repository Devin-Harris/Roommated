import { createAction, props } from '@ngrx/store';
import { CreateUserDto, ResponseUserDto } from '@rmtd/common/dtos';
import { User } from '@rmtd/common/interfaces';

export const reAuthenticate = createAction('[Authentication] reAuthenticate');
export const reAuthenticateSuccess = createAction(
  '[Authentication] reAuthenticate success',
  props<{ user: User; access_token: string }>()
);
export const reAuthenticateFailure = createAction(
  '[Authentication] reAuthenticate failure',
  props<{ error: Error }>()
);

export const login = createAction(
  '[Authentication] login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Authentication] login success',
  props<{ user: User; access_token: string }>()
);
export const loginFailure = createAction(
  '[Authentication] login failure',
  props<{ error: Error }>()
);

export const signup = createAction(
  '[Authentication] signup',
  props<{ createUserInfo: CreateUserDto; profileImage?: File }>()
);
export const signupSuccess = createAction(
  '[Authentication] signup success',
  props<{ user: User; access_token: string }>()
);
export const signupFailure = createAction(
  '[Authentication] signup failure',
  props<{ error: Error }>()
);
