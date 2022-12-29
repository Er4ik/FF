import { UserEntity } from '../../users/entitites/user.entity';

export interface PostDto {
  id: number;
  createdBy: UserEntity;
  createdAt?: Date;
  updatedAt?: Date;
  ingredients?: string;
  steps?: string;
}
