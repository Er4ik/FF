import { IsNumber, IsDate, IsOptional } from 'class-validator';

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
  createdBy?: number;
}
