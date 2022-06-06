import { Gender, GroupRole } from 'enums';

export interface Group {
  size?: number;
  gender?: Gender;
  name?: string;
  groupRole?: GroupRole;
  showOnPosts?: boolean;
}
