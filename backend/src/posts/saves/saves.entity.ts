import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostSave as PostSaveInterface } from '@rmtd/common/interfaces';

@Entity()
export class PostSave implements PostSaveInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unsigned: true })
  userId: number;

  @Column({ type: 'int', unsigned: true })
  postId: number;

  @CreateDateColumn()
  saveDate: Date;
}
