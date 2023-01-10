import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  readonly photo?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly phone: string;
  readonly refreshToken?: string;
  readonly role?: string;

  @IsEmail({})
  email: string;

  @IsNotEmpty()
  password: string;
}
