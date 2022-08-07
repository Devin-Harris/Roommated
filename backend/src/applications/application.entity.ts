import { GroupInvitationState } from '@rmtd/common/enums';
import { Group } from 'src/groups/groups.entity';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['postId', 'applicantGroupId'])
export class Application {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true })
  postId: number;

  @Column({ type: 'int', unsigned: true })
  applicantUserId: number;

  @Column({ type: 'int', unsigned: true })
  applicantGroupId: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ default: GroupInvitationState.Pending })
  state: GroupInvitationState;

  @ManyToOne(() => Post, (post) => post.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => User, (applicantUser) => applicantUser.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicantUserId' })
  applicantUser: User;

  @ManyToOne(() => Group, (applicantGroup) => applicantGroup.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicantGroupId' })
  applicantGroup: Group;
}
