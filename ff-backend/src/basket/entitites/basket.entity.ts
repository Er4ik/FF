import { UserEntity } from '../../users/entitites/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: `basket_entity` })
export class BasketEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({
    name: 'product_name',
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  productName!: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description!: string;

  @Column({ name: 'comment', type: 'text', nullable: true })
  comment!: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'datetime', nullable: true })
  updatedAt!: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'created_by' })
  crearedBy!: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'updated_by' })
  updatedBy!: number;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive!: boolean;
}
