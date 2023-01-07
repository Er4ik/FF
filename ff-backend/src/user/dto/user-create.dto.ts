export class UserCreateDto {
  readonly photo?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  readonly refreshToken?: string;
  readonly role?: string;
}
