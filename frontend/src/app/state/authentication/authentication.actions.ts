import { createAction, props } from '@ngrx/store';
import { CreateUserDto, ResponseUserDto } from '@rmtd/common/dtos';

export const login = createAction('[Authentication] login');
export const loginSuccess = createAction('[Authentication] login success');
export const loginFailure = createAction('[Authentication] login failure');

export const signup = createAction(
  '[Authentication] signup',
  props<{ createUserInfo: CreateUserDto; profileImage?: File }>()
);
export const signupSuccess = createAction(
  '[Authentication] signup success',
  props<{ user: ResponseUserDto; access_token: string }>()
);
export const signupFailure = createAction(
  '[Authentication] signup failure',
  props<{ error: Error }>()
);
