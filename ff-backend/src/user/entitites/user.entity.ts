import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: `user_entity` })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ name: 'photo', type: 'varchar', nullable: true })
  photo!: string;

  @Column({ name: 'first_name', type: 'varchar', length: 30, nullable: false })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 30, nullable: false })
  lastName!: string;

  @Column({ name: 'user_name', type: 'varchar', length: 20, nullable: false })
  username!: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: false })
  phone!: string;

  @Column({ name: 'email', type: 'varchar', length: 80, nullable: false })
  email!: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password!: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  refreshToken!: string;

  @Column({ name: 'is_private', type: 'bool', default: false })
  isPrivate!: boolean;

  @Column({ name: 'is_active', type: 'bool', default: false })
  isActive!: boolean;

  @Column({ name: 'is_blocked', type: 'bool', default: false })
  isBlocked!: boolean;

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
  role!: string;
}
