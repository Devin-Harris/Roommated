import { createAction, props } from "@ngrx/store";

export const login = createAction(
  "[Authentication] login"
);
export const loginSuccess = createAction(
  "[Authentication] login success"
);
export const loginFailure = createAction(
  "[Authentication] login failure"
);