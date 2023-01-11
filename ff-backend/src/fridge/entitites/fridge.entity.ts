import { PostMediaEntity } from '../../post/entitites/post-media.entity';
import { UserEntity } from '../../user/entitites/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: `fridge_entity` })
export class FridgeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ name: 'product_name', type: 'varchar', nullable: true })
  productName!: string;

  @Column({ name: 'weight', type: 'int', nullable: true })
  weight!: number;

  @Column({ name: 'type_weight', type: 'int', nullable: true })
  typeWeight!: number;

  @ManyToOne(() => PostMediaEntity, (post) => post.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'media_id' })
  mediaId!: PostMediaEntity;

  @Column({ name: 'description', type: 'text', nullable: true })
  description!: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'created_by' })
  createdBy!: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'updated_by' })
  updatedBy!: UserEntity;

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'datetime', nullable: true })
  updatedAt!: Date;
}
