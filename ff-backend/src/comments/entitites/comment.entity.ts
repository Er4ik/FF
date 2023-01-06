import { PostEntity } from './../../posts/entitites/post.entity';
import { UserEntity } from '../../users/entitites/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: `comment_entity` })
export class CommentEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'created_by' })
  createdBy!: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post' })
  post: PostEntity;

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

  @TreeChildren()
  @JoinColumn({ name: 'children_id' })
  childrenId: CommentEntity[];

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parentId!: CommentEntity;
}
