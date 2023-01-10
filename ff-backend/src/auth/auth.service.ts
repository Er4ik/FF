import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTokenDto } from '../user/dto/user-token.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entitites/user.entity';
import { TokenDto, TokenUserDto } from './dto/token.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
      return await this.userRepository.save({
        ...tokenData,
      });
    }

    const token = await this.userRepository.save({ id: userId, refreshToken });
    return token;
  }
}
