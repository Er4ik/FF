import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostsEntity } from './posts.entity';

@Entity({ name: `posts_media_entity` })
export class PostsMediaEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @ManyToOne(() => PostsEntity, (posts) => posts.id)
  @JoinColumn({ name: 'posts_id' })
  postsId!: number;

  @Column({ name: 'media_file', type: 'varchar', nullable: false })
  mediaFile!: string;

  @Column({ name: 'position', type: 'int', nullable: false, default: 0 })
  position!: number;
}
