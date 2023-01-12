import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTokenDto } from '../user/dto/user-token.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entitites/user.entity';
import { TokenDto, TokenUserDto } from './dto/token.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ErrorHandlerService } from '../shared/helpers/error-handler/error-handler.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateTokenPair(payload: UserTokenDto): Promise<TokenDto> {
    try {
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
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  async saveToken(userId: number, refreshToken: string): Promise<TokenUserDto> {
    try {
      const tokenData = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return await this.userRepository.save({
          ...tokenData,
        });
      }

      const token = await this.userRepository.save({
        id: userId,
        refreshToken,
      });
      return token;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }
}
