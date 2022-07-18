import { GroupInvitationState } from '@rmtd/common/enums';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post.entity';

@Entity()
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

  @OneToOne(() => Post, (post) => post.id)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'applicantUserId' })
  applicantUser: User;
}
