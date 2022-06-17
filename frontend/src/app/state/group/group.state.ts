import { Group, GroupInvitation } from '@rmtd/common/interfaces';

export interface GroupState {
  currentUserGroup: Group | null;
  currentUserGroupInvitations: GroupInvitation[];
  error: Error | null;
  pageEntered: boolean;
}

export const initialState: GroupState = {
  currentUserGroup: null,
  currentUserGroupInvitations: [],
  error: null,
  pageEntered: false,
};
