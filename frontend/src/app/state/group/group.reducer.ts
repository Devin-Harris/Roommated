import { Action, createReducer, on } from '@ngrx/store';
import { GroupState, initialState } from './group.state';
import * as GroupActions from './group.actions';
import * as AuthenticationActions from '../authentication/authentication.actions';

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
    groupLoading: false,
  })),
  on(GroupActions.getMyGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
    groupLoading: false,
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
    groupLoading: true,
  })),
  on(GroupActions.createGroupSuccess, (state, action) => ({
    ...state,
    currentUserGroup: action.group,
    groupLoading: false,
  })),
  on(GroupActions.createGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(GroupActions.saveGroup, (state) => ({
    ...state,
    groupLoading: true,
  })),
  on(GroupActions.saveGroupSuccess, (state, action) => ({
    ...state,
    currentUserGroup: action.group,
    groupLoading: false,
  })),
  on(GroupActions.saveGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(GroupActions.leaveGroup, (state) => ({
    ...state,
    groupLoading: true,
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
  })),
  on(GroupActions.getGroupByIdSuccess, (state, action) => ({
    ...state,
    groupInfoPage: action.group,
  })),
  on(GroupActions.createGroupPost, GroupActions.updateGroupPost, (state, action) => ({
    ...state,
    groupLoading: true,
  })),
  on(AuthenticationActions.signout, (state, action) => ({
    ...state,
    currentUserGroup: null,
    currentUserGroupInvitations: [],
  }))
);

export function reducer(state: GroupState | undefined, action: Action) {
  return groupReducer(state, action);
}
