export class TokenDto {
  readonly accessToken?: string;
  readonly refreshToken?: string;
}

export class TokenUserDto {
  readonly id: number;
  readonly refreshToken: string;
}
