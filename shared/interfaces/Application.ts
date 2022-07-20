import { GroupInvitationState } from '../enums';
import { User } from './User';
import { Post } from './Post';
import { Group } from './Group';

export interface Application {
  id?: number;
  postId?: number;
  post?: Post;
  applicantUserId?: number;
  applicantUser?: User;
  applicantGroupId?: number;
  applicantGroup?: Group;
  comment?: string;
  state?: GroupInvitationState;
}
