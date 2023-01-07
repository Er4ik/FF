import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entitites/user.entity';
import { UserController } from '../user/user.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [UserController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class AuthModule {}
