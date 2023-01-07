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

  @ManyToOne(() => PostMediaEntity, (post) => post.id)
  @JoinColumn({ name: 'media_id' })
  mediaId!: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description!: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'created_by' })
  createdBy!: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'updated_by' })
  updatedBy!: number;

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
