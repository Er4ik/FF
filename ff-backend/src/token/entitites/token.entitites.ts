import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: `token_entity` })
export class TokenEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 120,
    nullable: false,
  })
  refreshToken!: string;
}
