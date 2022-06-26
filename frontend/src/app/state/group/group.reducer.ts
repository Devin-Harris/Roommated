import { Action, createReducer, on } from '@ngrx/store';
import { GroupState, initialState } from './group.state';
import * as GroupActions from './group.actions';

const groupReducer = createReducer(
  initialState,
  on(GroupActions.myGroupPageLoaded, (state) => ({
    ...state,
    pageEntered: true,
  })),
  on(GroupActions.getMyGroup, (state) => ({
    ...state,
  })),
  on(GroupActions.getMyGroupSuccess, (state, action) => ({
    ...state,
    currentUserGroup: action.group,
  })),
  on(GroupActions.getMyGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(GroupActions.getMyGroupInvitations, (state) => ({
    ...state,
  })),
  on(GroupActions.getMyGroupInvitationsSuccess, (state, action) => ({
    ...state,
    currentUserGroupInvitations: action.invitations,
  })),
  on(GroupActions.getMyGroupInvitationsFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(GroupActions.createGroup, (state) => ({
    ...state,
  })),
  on(GroupActions.createGroupSuccess, (state, action) => ({
    ...state,
    currentUserGroup: action.group,
  })),
  on(GroupActions.createGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(GroupActions.saveGroup, (state) => ({
    ...state,
  })),
  on(GroupActions.saveGroupSuccess, (state, action) => ({
    ...state,
    currentUserGroup: action.group,
  })),
  on(GroupActions.saveGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(GroupActions.leaveGroup, (state) => ({
    ...state,
  })),
  on(GroupActions.leaveGroupSuccess, (state, action) => ({
    ...state,
    currentUserGroup: null,
  })),
  on(GroupActions.leaveGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(GroupActions.getGrouplessUsers, (state) => ({
    ...state,
  })),
  on(GroupActions.getGrouplessUsersSuccess, (state, action) => ({
    ...state,
    grouplessUsersSearchResults: action.grouplessUsers,
  })),
  on(GroupActions.getGrouplessUsersFailure, (state, action) => ({
    ...state,
    grouplessUsersSearchResults: [],
    error: action.error,
  }))
);

export function reducer(state: GroupState | undefined, action: Action) {
  return groupReducer(state, action);
}
