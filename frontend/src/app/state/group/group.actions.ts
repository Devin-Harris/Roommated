import { createAction, props } from '@ngrx/store';
import {
  CreatePostDto,
  ResponseGroupDto,
  ResponsePostDto,
  UpdateGroupDto,
  UpdatePostDto,
} from '@rmtd/common/dtos';
import { Group, GroupInvitation, User } from '@rmtd/common/interfaces';

export const myGroupPageLoaded = createAction('[Group] page loaded');

export const groupInfoPageLoaded = createAction(
  '[Group Info] page loaded',
  props<{ id: Number | null }>()
);
export const groupInfoPageLoadedSuccess = createAction(
  '[Group Info] page loaded success',
  props<{ user: User | null }>()
);
export const groupInfoPageLoadedFailure = createAction(
  '[Group Info] page loaded failure',
  props<{ error: Error }>()
);

export const getGroupById = createAction(
  '[Group Info] get group info',
  props<{ id: Number | null }>()
);
export const getGroupByIdSuccess = createAction(
  '[Group Info] get group info success',
  props<{ group: Group }>()
);
export const getGroupByIdFailure = createAction(
  '[Group Info] get group info failure',
  props<{ error: Error }>()
);

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

export const createGroup = createAction(
  '[Group] create group',
  props<{
    group: Group;
  }>()
);
export const createGroupSuccess = createAction(
  '[Group] create group success',
  props<{ group: ResponseGroupDto }>()
);
export const createGroupFailure = createAction(
  '[Group] create group failure',
  props<{ error: Error }>()
);

export const createGroupPost = createAction(
  '[Group] create group post',
  props<{
    post: CreatePostDto;
  }>()
);
export const createGroupPostSuccess = createAction(
  '[Group] create group post success',
  props<{ post: ResponsePostDto }>()
);
export const createGroupPostFailure = createAction(
  '[Group] create group post failure',
  props<{ error: Error }>()
);

export const deleteMyGroup = createAction('[Group] delete group');

export const deleteMyGroupSuccess = createAction('[Group] delete group success');

export const deleteMyGroupFailure = createAction(
  '[Group] delete group failure',
  props<{ error: Error }>()
);

export const updateGroupPost = createAction(
  '[Group] update group post',
  props<{
    post: UpdatePostDto;
  }>()
);
export const updateGroupPostSuccess = createAction(
  '[Group] update group post success',
  props<{ post: ResponsePostDto }>()
);
export const updateGroupPostFailure = createAction(
  '[Group] update group post failure',
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

export const declineGroupInvitation = createAction(
  '[Group] decline group invitation',
  props<{ invitation: GroupInvitation }>()
);
export const declineGroupInvitationSuccess = createAction(
  '[Group] decline group invitation success'
);
export const declineGroupInvitationFailure = createAction(
  '[Group] decline group invitation failure',
  props<{ error: Error }>()
);

export const acceptGroupInvitation = createAction(
  '[Group] accept group invitation',
  props<{ invitation: GroupInvitation }>()
);
export const acceptGroupInvitationSuccess = createAction('[Group] accept group invitation success');
export const acceptGroupInvitationFailure = createAction(
  '[Group] accept group invitation failure',
  props<{ error: Error }>()
);
