import { GroupInvitationState } from '../enums';
import { User } from './User';
import { Post } from './Post';

export interface Application {
  postId: number;
  post: Post;
  applicantUserId: number;
  applicantUser: User;
  comment?: string;
  state: GroupInvitationState;
}
