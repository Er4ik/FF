import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../user/entitites/user.entity';

import { PostEntity } from './post.entity';

@Entity({ name: `post_like_entity` })
export class PostLikeEntity {
  @PrimaryColumn({ type: 'int' })
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user!: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post' })
  post!: PostEntity;
}
