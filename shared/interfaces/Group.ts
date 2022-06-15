import { ResponseGroupDto, ResponseUserDto } from './../dtos';
import { Gender, GroupRole } from '../enums';
import { User } from './User';

export interface GroupUser {
  id?: number;
  groupId?: number;
  userId?: number;
  groupRole?: GroupRole;
  group?: Group;
  user?: User;
}

export interface Group {
  id?: number;
  createDate?: Date;
  createUserId?: number;
  updateUserId?: number;
  size?: number;
  gender?: Gender;
  name?: string;
  showOnPosts?: boolean;
  groupUsers?: GroupUser[];
}
