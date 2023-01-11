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

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'created_by' })
  createdBy!: UserEntity;

  @ManyToOne(() => PostMediaEntity, (post) => post.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  postId: PostMediaEntity;

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

  @ManyToOne(() => CommentEntity, (comment) => comment.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_replied_to_id' })
  commentRepliedToId: CommentEntity;
}
