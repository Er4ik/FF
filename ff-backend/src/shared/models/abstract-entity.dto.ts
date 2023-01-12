import { IsNumber, IsDate, IsOptional } from 'class-validator';

import { UserEntity } from '../../user/entitites/user.entity';

export class AbstractEntityDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @IsOptional()
  createdBy?: UserEntity;
}
