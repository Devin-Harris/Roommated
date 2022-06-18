import { createAction, props } from '@ngrx/store';
import { ResponseGroupDto, UpdateGroupDto } from '@rmtd/common/dtos';
import { Group, GroupInvitation, User } from '@rmtd/common/interfaces';

export const myGroupPageLoaded = createAction('[Group] page loaded');

export const getMyGroup = createAction('[Group] get my group');
export const getMyGroupSuccess = createAction(
  '[Group] get my group success',
  props<{ group: Group }>()
);
export const getMyGroupFailure = createAction(
  '[Group] get my group failure',
  props<{ error: Error }>()
);

export const getGrouplessUsers = createAction(
  '[Group] get groupless users',
  props<{ searchText: string }>()
);
export const getGrouplessUsersSuccess = createAction(
  '[Group] get groupless users success',
  props<{ grouplessUsers: User[] }>()
);
export const getGrouplessUsersFailure = createAction(
  '[Group] get groupless users failure',
  props<{ error: Error }>()
);

export const getMyGroupInvitations = createAction('[Group] get my group invitations');
export const getMyGroupInvitationsSuccess = createAction(
  '[Group] get my group invitations success',
  props<{ invitations: GroupInvitation[] }>()
);
export const getMyGroupInvitationsFailure = createAction(
  '[Group] get my group invitations failure',
  props<{ error: Error }>()
);

export const saveGroup = createAction(
  '[Group] save group',
  props<{
    mutatedGroup: Group | null;
    userIdsToRemove: number[];
    userIdsToPromote: number[];
    userIdsToDemote: number[];
    invitationIdsToRemove: number[];
  }>()
);
export const saveGroupSuccess = createAction(
  '[Group] save group success',
  props<{ group: ResponseGroupDto }>()
);
export const saveGroupFailure = createAction(
  '[Group] save group failure',
  props<{ error: Error }>()
);

export const leaveGroup = createAction('[Group] leave group');
export const leaveGroupSuccess = createAction('[Group] leave group success');
export const leaveGroupFailure = createAction(
  '[Group] leave group failure',
  props<{ error: Error }>()
);

export const sendGroupInvitations = createAction(
  '[Group] send group invitations',
  props<{ users: User[] }>()
);
export const sendGroupInvitationsSuccess = createAction('[Group] send group invitations success');
export const sendGroupInvitationsFailure = createAction(
  '[Group] send group invitations failure',
  props<{ error: Error }>()
);
