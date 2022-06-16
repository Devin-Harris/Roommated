export interface GroupState {
  // TODO: use group interface typing
  currentUserGroup: any | null;
  // TODO: use group invitation interface typing
  currentUserGroupInvitations: any[];
  error: Error | null;
  pageEntered: boolean;
}

export const initialState: GroupState = {
  currentUserGroup: null,
  currentUserGroupInvitations: [],
  error: null,
  pageEntered: false,
};
