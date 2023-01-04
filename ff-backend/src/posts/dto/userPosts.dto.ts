import { IsOptional, MaxLength } from 'class-validator';

import { AbstractEntityDto } from '../../shared/models/abstract-entity.dto';

export interface PostStep {
  photo: string;
  ingredients: string[];
  description: string;
  time: number;
}

export class PostDto extends AbstractEntityDto {
  @IsOptional()
  @MaxLength(255)
  caption?: string;

  @IsOptional()
  ingredients?: string[];

  @IsOptional()
  steps?: PostStep[];
}
