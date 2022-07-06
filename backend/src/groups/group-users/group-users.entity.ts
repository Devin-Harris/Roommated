import { GroupUserRole } from '@rmtd/common/enums';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Group } from '../groups.entity';

@Entity()
export class GroupUser {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true })
  groupId: number;

  @Column({ type: 'int', unsigned: true })
  userId: number;

  @Column({ type: 'varchar' })
  groupRole: GroupUserRole;

  @ManyToOne(() => Group, (group) => group.id)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;
}
