import { Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: `follower` })
export class followerUser {
  @PrimaryColumn({ type: 'int' })
  id!: number;

  @ManyToMany(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'followed_user_id' })
  followedUserId!: number;

  @ManyToMany(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'following_user_id' })
  followingUserId!: number;
}
