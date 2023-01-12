import { IsByteLength, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserLoginDto {
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @IsEmail({})
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsByteLength(7, 32)
  password: string;
}
