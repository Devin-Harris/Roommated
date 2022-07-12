import { createAction, props } from '@ngrx/store';
import { User } from '@rmtd/common/interfaces';

export const profilePageLoaded = createAction(
  '[Profile] profile page loaded',
  props<{ id: Number | null }>()
);

export const profilePageLoadedSuccess = createAction(
  '[Profile] profile page loaded success',
  props<{ user: User | null }>()
);

export const profilePageLoadedFailure = createAction(
  '[Profile] profile page loaded failure',
  props<{ error: Error }>()
);
