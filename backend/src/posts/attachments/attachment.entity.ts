import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post.entity';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unsigned: true })
  postId: number;

  @ManyToOne(() => Post, (post) => post.attachments, { onDelete: 'CASCADE' })
  post?: Post;

  @Column()
  url: string;
}
