import { IsArray, IsOptional, MaxLength } from 'class-validator';

import { PostStep } from './userPosts.dto';

export class CreatePostDto {
  @IsOptional()
  @MaxLength(255)
  caption?: string;

  @IsOptional()
  @IsArray()
  ingredients?: string[];

  @IsOptional()
  @IsArray()
  steps?: PostStep[];
}
