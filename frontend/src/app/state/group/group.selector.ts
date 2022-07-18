import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupState } from './group.state';

export const selectGroup = createFeatureSelector<GroupState>('group');

export const selectCurrentUserGroup = createSelector(
  selectGroup,
  (state: GroupState) => state.currentUserGroup
);

export const selectCurrentUserGroupInvitations = createSelector(
  selectGroup,
  (state: GroupState) => state.currentUserGroupInvitations
);

export const selectGroupError = createSelector(selectGroup, (state: GroupState) => state.error);

export const selectGrouplessUsersSearchResults = createSelector(
  selectGroup,
  (state: GroupState) => state.grouplessUsersSearchResults
);

export const selectGroupInfoGroup = createSelector(
  selectGroup,
  (state: GroupState) => state.groupInfoPage
);
