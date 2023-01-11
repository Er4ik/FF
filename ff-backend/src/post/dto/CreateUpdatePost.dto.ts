import { IsArray, IsOptional, MaxLength } from 'class-validator';

import { PostStepDto } from './userPosts.dto';

export class CreateUpdatePostDto {
  @IsOptional()
  @MaxLength(255)
  caption?: string;

  @IsOptional()
  @IsArray()
  ingredients?: string[];

  @IsOptional()
  @IsArray()
  steps?: PostStepDto[];
}
