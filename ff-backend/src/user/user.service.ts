import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { UserCreateDto } from './dto/user-create.dto';
import { UserFollowerEntity } from './entitites/user-follower.entity';
import { UserEntity } from './entitites/user.entity';
import { EmailService } from '../email/email.service';
import { TokenService } from '../token/token.service';
import { UserTokenDto } from './dto/user-token.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserFollowerEntity)
    private userFollowerRepository: Repository<UserFollowerEntity>,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
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
      const activationLink = uuid.v4();
      const user = await this.userRepository.save({
        ...userDate,
        photo: userDate.photo ?? null,
        password: hashPassword,
        role: userDate.role ?? 'userAAA',
      });

      await this.emailService.sendEmail({
        to: email,
        html: activationLink,
      });

      const userDto = new UserTokenDto(user);
      const tokens = await this.tokenService.generate({ ...userDto });
      await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    } catch (err) {
      console.error(err);
    }
  }
}
