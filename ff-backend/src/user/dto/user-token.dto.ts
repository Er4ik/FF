import { UserEntity } from '../entitites/user.entity';

export class UserTokenDto {
  readonly id: number;
  readonly email: string;
  readonly username: string;
  readonly isActive: boolean;

  constructor(model: UserEntity) {
    this.email = model.email;
    this.id = model.id;
    this.isActive = model.isActive;
    this.username = model.username;
  }
}
