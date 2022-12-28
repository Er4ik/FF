import { Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../users/entitites/user.entity';
import { PostEntity } from './post.entity';

@Entity({ name: `post_like_entity` })
export class PostLikeEntity {
  @PrimaryColumn({ type: 'int' })
  id!: number;

  @ManyToMany(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  userId!: string;

  @ManyToMany(() => PostEntity, (post) => post.id)
  @JoinColumn({ name: 'post_id' })
  postId!: string;
}
