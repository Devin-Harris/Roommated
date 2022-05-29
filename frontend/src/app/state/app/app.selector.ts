import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const selectApp = createFeatureSelector<AppState>("app");

export const selectIsAppLoaded = createSelector(
  selectApp,
  (state: AppState) => state.appLoaded
);