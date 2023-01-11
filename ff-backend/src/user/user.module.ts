import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { AuthService } from '../auth/auth.service';
import { UserFollowerEntity } from './entitites/user-follower.entity';
import { UserEntity } from './entitites/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ErrorHandlerModule } from '../shared/helpers/error-handler/error-handler.module';
import { LoggerModule } from '../shared/helpers/logger/logger.module';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, EmailService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserFollowerEntity]),
    ErrorHandlerModule,
    LoggerModule,
  ],
})
export class UserModule {}
