import { Gender, GroupInvitationState, GroupUserRole } from '../enums';
import { Post } from './Post';
import { User } from './User';

export interface GroupInvitation {
  id?: number;
  groupId?: number;
  receivingUserId?: number;
  state?: GroupInvitationState;
  createDate?: Date;
  group?: Group;
  receivingUser?: User;
}

export interface GroupUser {
  id?: number;
  groupId?: number;
  userId?: number;
  groupRole?: GroupUserRole;
  group?: Group;
  user?: User;
}

export interface Group {
  id?: number;
  createDate?: Date;
  createUserId?: number;
  updateUserId?: number;
  gender?: Gender;
  name?: string;
  showOnPosts?: boolean;
  groupUsers?: GroupUser[];
  groupInvitations?: GroupInvitation[];
  post?: Post;
}
