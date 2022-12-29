import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../users/entitites/user.entity';
import { PostEntity } from './post.entity';

@Entity({ name: `post_like_entity` })
export class PostLikeEntity {
  @PrimaryColumn({ type: 'int' })
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user!: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.likes)
  @JoinColumn({ name: 'post' })
  post!: PostEntity;
}
