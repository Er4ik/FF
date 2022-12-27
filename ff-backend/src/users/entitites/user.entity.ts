import { PostsEntity } from '../../posts/entitites/posts.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: `user_entity` })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ name: 'first_name', type: 'varchar', length: 30, nullable: false })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 30, nullable: false })
  lastName!: string;

  @Column({ name: 'username', type: 'varchar', length: 20, nullable: false })
  username!: string | null;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: false })
  phone!: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email!: string;

  @Column({ name: 'password', type: 'varchar', length: 40, nullable: false })
  password!: string;

  @Column({ name: 'verification_code', type: 'int', nullable: true })
  verificationCode!: number;

  @Column({ name: 'is_active', type: 'bool', default: false })
  isActive!: boolean;

  @Column({ name: 'is_blocked', type: 'bool', default: false })
  isBlocked!: Date;

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'datetime', nullable: true })
  updatedAt!: Date;

  @Column({ name: 'role', type: 'varchar', length: 20, nullable: false })
  role!: Date;
}
