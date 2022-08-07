import { Post } from './Post';
import { User } from './User';

export interface PostSave {
  id?: number;
  createUserId?: number;
  postId?: number;
  saveDate?: Date;
  user?: User;
  post?: Post;
}
