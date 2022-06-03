import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Gender, GroupRole } from '@roommated/common/enums';

@Entity()
export class Group {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

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

  @Column()
  groupRole: GroupRole;

  @Column({ nullable: true })
  showOnPosts: boolean;

  @OneToOne((type) => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createUserId' })
  createUser: User;

  @OneToOne((type) => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updateUserId' })
  updateUser: User;
}
