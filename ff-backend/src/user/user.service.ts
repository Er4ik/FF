import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
//import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

import { UserCreateDto } from './dto/user-create.dto';
import { UserFollowerEntity } from './entitites/user-follower.entity';
import { UserEntity } from './entitites/user.entity';
import { EmailService } from '../email/email.service';
import { AuthService } from '../auth/auth.service';
import { UserTokenDto } from './dto/user-token.dto';
import { LoggerService } from '../shared/helpers/logger/logger.service';
import { ErrorHandlerService } from '../shared/helpers/error-handler/error-handler.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserFollowerEntity)
    private userFollowerRepository: Repository<UserFollowerEntity>,
    private readonly emailService: EmailService,
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async getOne(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id: +userId,
      },
      select: {
        username: true,
        firstName: true,
        lastName: true,
        photo: true,
        isPrivate: true,
      },
    });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        photo: true,
        isPrivate: true,
        isActive: true,
        isBlocked: true,
      },
    });
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
    return;
  }

  async createUser(userDate: UserCreateDto) {
    try {
      const { username, email, password } = userDate;

      const canDidDateEmail = await this.userRepository.find({
        where: [{ username }, { email }],
      });

      if (canDidDateEmail.length) {
        throw new Error(
          `A user with that ${email} or ${username} already exists`,
        );
      }

      const hashPassword = await bcrypt.hash(password, 3);
      //const activationLink = uuid.v4();
      const user = await this.userRepository.save({
        ...userDate,
        photo: userDate.photo ?? null,
        password: hashPassword,
        role: userDate.role ?? 'user',
      });

      const userDto = new UserTokenDto(user);
      const tokens = await this.authService.generate({ ...userDto });
      await this.authService.saveToken(userDto.id, tokens.refreshToken);

      await this.emailService.sendEmail({
        to: email,
        link: `${process.env.API_URL}user/activate/${tokens.accessToken}`,
      });

      this.logger.info(
        `User was successfully created: id - ${user.id}, username - ${user.username}`,
      );

      return {
        ...tokens,
        user: userDto,
      };
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  async activate(activateLink: string): Promise<void> {
    try {
      const { id } = jwt.decode(activateLink) as UserTokenDto;
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new Error('Неккоректная ссылка для активации');
      }

      user.isActive = true;
      await this.userRepository.save(user);

      this.logger.info(
        `User was successfully activate: id - ${user.id}, username - ${user.username}`,
      );
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }
}
