import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { UserTokenDto } from 'src/user/dto/user-token.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entitites/user.entity';
import { TokenDto, TokenUserDto } from './dto/token.dto';
import { TokenEntity } from './entitites/token.entitites';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}

  async generate(payload: UserTokenDto): Promise<TokenDto> {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: number, refreshToken: string): Promise<TokenUserDto> {
    const tokenData = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await this.tokenRepository.save({
        ...tokenData,
      });
    }

    const token = await this.tokenRepository.save({ id: userId, refreshToken });
    return token;
  }
}
