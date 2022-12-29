import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity({ name: `post_media_entity` })
export class PostMediaEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @ManyToOne(() => PostEntity, (posts) => posts.media)
  @JoinColumn({ name: 'posts' })
  posts!: PostEntity;

  @Column({ name: 'media_file', type: 'varchar', nullable: false })
  mediaFile!: string;

  @Column({ name: 'position', type: 'int', nullable: false, default: 0 })
  position!: number;
}
