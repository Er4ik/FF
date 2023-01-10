import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { AuthService } from '../auth/auth.service';
import { UserFollowerEntity } from './entitites/user-follower.entity';
import { UserEntity } from './entitites/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, EmailService],
  imports: [TypeOrmModule.forFeature([UserEntity, UserFollowerEntity])],
})
export class UserModule {}
