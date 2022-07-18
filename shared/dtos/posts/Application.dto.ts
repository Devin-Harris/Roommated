import { Application, Post, User } from '../../interfaces';
import { Expose } from 'class-transformer';
import { GroupInvitationState } from '../../enums';

export class ApplicationDto implements Partial<Application> {
  @Expose()
  postId: number;

  @Expose()
  applicantUserId: number;

  @Expose()
  comment?: string | undefined;

  @Expose()
  state: GroupInvitationState;
}
