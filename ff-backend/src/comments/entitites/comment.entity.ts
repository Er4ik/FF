import { PostMediaEntity } from '../../post/entitites/post-media.entity';
import { UserEntity } from '../../user/entitites/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: `comment_entity` })
export class CommentEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'created_by' })
  crearedBy!: number;

  @ManyToOne(() => PostMediaEntity, (post) => post.id)
  @JoinColumn({ name: 'post_id' })
  postId: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'datetime', nullable: true })
  updatedAt!: Date;

  @Column({ name: 'comment', type: 'text', nullable: false })
  comment!: string;

  @ManyToOne(() => CommentEntity, (comment) => comment.id)
  @JoinColumn({ name: 'comment_replied_to_id' })
  commentRepliedToId: string;
}
