import { ResponseGroupDto, ResponseUserDto } from './../dtos';
import { Gender, GroupUserRole } from '../enums';
import { User } from './User';

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
  size?: number;
  gender?: Gender;
  name?: string;
  showOnPosts?: boolean;
  groupUsers?: GroupUser[];
}
