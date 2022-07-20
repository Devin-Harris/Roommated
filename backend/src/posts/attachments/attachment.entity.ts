import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post.entity';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.attachments, { onDelete: 'CASCADE' })
  post?: Post;

  @Column()
  postId: number;

  @Column()
  url: string;
}
