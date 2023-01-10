import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entitites/user.entity';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class AuthModule {}
