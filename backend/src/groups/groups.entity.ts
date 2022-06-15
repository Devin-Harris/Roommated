import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Gender, GroupRole } from '@rmtd/common/enums';
import { Group as IGroup } from '@rmtd/common/interfaces';
import { GroupUser } from './group-users/group-users.entity';

@Entity()
export class Group implements IGroup {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'date', nullable: true })
  createDate: Date;

  @Column({ type: 'int', unsigned: true, nullable: true })
  createUserId: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  updateUserId: number;

  @Column()
  size: number;

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

  @OneToMany(() => GroupUser, (groupUser) => groupUser.group, { onDelete: 'CASCADE' })
  groupUsers: GroupUser[];
}
