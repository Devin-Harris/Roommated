import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Group } from '../groups.entity';
import { GroupInvitationState } from '@rmtd/common/enums';

@Entity()
export class GroupInvitation {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true })
  groupId: number;

  @Column({ type: 'int', unsigned: true })
  receivingUserId: number;

  @Column()
  state: GroupInvitationState;

  @ManyToOne((type) => Group, (group) => group.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receivingUserId' })
  receivingUser: User;
}
