import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthenticationState } from "./authentication.state";


export const selectAuthentication = createFeatureSelector<AuthenticationState>("authentication");

export const selectIsLoggedIn = createSelector(
  selectAuthentication,
  (state: AuthenticationState) => state.isLoggedIn
);