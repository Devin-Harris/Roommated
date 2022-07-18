import { GroupInvitationState } from '@rmtd/common/enums';
import { Application as ApplicationInterface } from '@rmtd/common/interfaces';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post.entity';

@Entity()
export class Application implements ApplicationInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unsigned: true })
  postId: number;

  @OneToOne(() => Post)
  @JoinColumn()
  post: Post;

  @Column({ unsigned: true })
  applicantUserId: number;

  @OneToOne(() => User)
  @JoinColumn()
  applicantUser: User;

  @Column({ nullable: true })
  comment: string;

  @Column()
  state: GroupInvitationState;
}
