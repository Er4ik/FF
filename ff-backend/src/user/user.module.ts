import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { AuthService } from '../auth/auth.service';
import { UserFollowerEntity } from './entitites/user-follower.entity';
import { UserEntity } from './entitites/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokenEntity } from '../token/entitites/token.entitites';
import { TokenService } from '../token/token.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, TokenService, EmailService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserFollowerEntity, TokenEntity]),
  ],
})
export class UserModule {}
