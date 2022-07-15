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

export const updateMyProfile = createAction(
  '[Profile] update my profile',
  props<{ updateUserInfo: User; profileImage?: File }>()
);

export const updateMyProfileSuccess = createAction(
  '[Profile] update my profile success',
  props<{ user: User | null }>()
);

export const updateMyProfileFailure = createAction(
  '[Profile] update my profile failure',
  props<{ error: Error }>()
);
