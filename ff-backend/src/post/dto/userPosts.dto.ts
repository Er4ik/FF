import { IsArray, IsNumber, IsOptional, MaxLength } from 'class-validator';

import { AbstractEntityDto } from '../../shared/models/abstract-entity.dto';

export class PostStepDto {
  @IsOptional()
  photo?: string;

  @IsOptional()
  @IsArray()
  ingredients?: string[];

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  time?: number;
}

export class PostDto extends AbstractEntityDto {
  @IsOptional()
  @MaxLength(255)
  caption?: string;

  @IsOptional()
  ingredients?: string[];

  @IsOptional()
  steps?: PostStepDto[];

  @IsOptional()
  @IsNumber()
  time?: number;
}
