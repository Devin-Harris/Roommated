import { createAction, props } from '@ngrx/store';

export const myGroupPageLoaded = createAction('[Group] page loaded');
export const getMyGroup = createAction('[Group] get my group');
export const getMyGroupSuccess = createAction(
  '[Group] get my group success',
  props<{ group: any }>()
);
export const getMyGroupFailure = createAction(
  '[Group] get my group failure',
  props<{ error: Error }>()
);
export const getMyGroupInvitations = createAction('[Group] get my group invitations');
export const getMyGroupInvitationsSuccess = createAction(
  '[Group] get my group invitations success',
  props<{ invitations: any }>()
);
export const getMyGroupInvitationsFailure = createAction(
  '[Group] get my group invitations failure',
  props<{ error: Error }>()
);
