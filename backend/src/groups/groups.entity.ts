import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Gender } from '@rmtd/common/enums';
import { Group as IGroup } from '@rmtd/common/interfaces';
import { GroupUser } from './group-users/group-users.entity';
import { GroupInvitation } from './group-invitations/group-invitations.entity';
import { Post } from 'src/posts/post.entity';
import { Application } from 'src/applications/application.entity';

@Entity()
export class Group implements IGroup {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @CreateDateColumn()
  createDate: Date;

  @Column({ type: 'int', unsigned: true, nullable: true })
  createUserId: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  updateUserId: number;

  @Column()
  gender: Gender;

  @Column()
  name: string;

  @Column({ nullable: true })
  showOnPosts: boolean;

  @OneToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createUserId' })
  createUser: User;

  @OneToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updateUserId' })
  updateUser: User;

  @OneToOne(() => Post, (post) => post.group)
  post: Post;

  @OneToMany(() => GroupUser, (groupUser) => groupUser.group)
  groupUsers: GroupUser[];

  @OneToMany(() => GroupInvitation, (groupInvitation) => groupInvitation.group)
  groupInvitations: GroupInvitation[];

  @OneToMany(() => Application, (application) => application.applicantGroup)
  sentApplications: GroupInvitation[];
}
