import { UserEntity } from '../../users/entitites/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostLikeEntity } from './post-likes.entity';
import { PostMediaEntity } from './post-media.entity';

@Entity({ name: `post_entity` })
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'created_by' })
  createdBy!: UserEntity;

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'datetime', nullable: true })
  updatedAt!: Date;

  @Column({ name: 'ingredients', type: 'varchar', nullable: true })
  ingredients!: string;

  @Column({ name: 'steps', type: 'json', nullable: true })
  steps!: string;

  @OneToMany(() => PostLikeEntity, (postLikes) => postLikes.post)
  @JoinColumn({ name: 'likes' })
  likes!: PostLikeEntity[];

  @OneToMany(() => PostMediaEntity, (postMedia) => postMedia.posts)
  @JoinColumn({ name: 'media' })
  media!: PostMediaEntity[];
}
