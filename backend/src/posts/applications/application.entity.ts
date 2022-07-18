import { GroupInvitationState } from '@rmtd/common/enums';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Post } from '../post.entity';

@Entity()
@Unique(['postId', 'applicantUserId'])
export class Application {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  postId: number;

  @Column({ type: 'int', unsigned: true })
  applicantUserId: number;

  @Column({ nullable: true })
  comment: string;

  @Column()
  state: GroupInvitationState;

  @ManyToOne(() => Post, (post) => post.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => User, (applicantUser) => applicantUser.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicantUserId' })
  applicantUser: User;
}
