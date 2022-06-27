import { Group, GroupInvitation, User } from '@rmtd/common/interfaces';

export interface GroupState {
  currentUserGroup: Group | null;
  currentUserGroupInvitations: GroupInvitation[];
  error: Error | null;
  pageEntered: boolean;
  grouplessUsersSearchResults: User[];
}

export const initialState: GroupState = {
  currentUserGroup: null,
  currentUserGroupInvitations: [],
  error: null,
  pageEntered: false,
  grouplessUsersSearchResults: [],
};
