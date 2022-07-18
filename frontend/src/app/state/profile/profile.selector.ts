import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';

export const selectProfile = createFeatureSelector<ProfileState>('profile');

export const selectUserProfile = createSelector(
  selectProfile,
  (state: ProfileState) => state.userProfile
);
