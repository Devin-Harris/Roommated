import { Application, Post, User } from '../../interfaces';
import { Expose } from 'class-transformer';
import { GroupInvitationState } from '../../enums';

export class ApplicationDto implements Partial<Application> {
  @Expose()
  post: Post;

  @Expose()
  applicantUserId: number;

  @Expose()
  applicantUser: User;

  @Expose()
  comment?: string | undefined;

  @Expose()
  state: GroupInvitationState;
}
