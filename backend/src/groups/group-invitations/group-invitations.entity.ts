import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { GroupInvitationState } from '@rmtd/common/enums';
import { Group } from '../groups.entity';

@Entity()
export class GroupInvitation {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true })
  groupId: number;

  @Column({ type: 'int', unsigned: true })
  receivingUserId: number;

  @Column({ type: 'varchar' })
  state: GroupInvitationState;

  @CreateDateColumn()
  createDate: Date;

  @ManyToOne((type) => Group, (group) => group.id, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'receivingUserId' })
  receivingUser: User;
}
