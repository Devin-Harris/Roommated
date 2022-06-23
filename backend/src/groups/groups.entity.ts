import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Gender } from '@rmtd/common/enums';

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

  @Column({ nullable: true })
  showOnPosts: boolean;

  @OneToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createUserId' })
  createUser: User;

  @OneToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updateUserId' })
  updateUser: User;
}
