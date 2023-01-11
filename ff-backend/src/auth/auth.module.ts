import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandlerModule } from '../shared/helpers/error-handler/error-handler.module';
import { UserEntity } from '../user/entitites/user.entity';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([UserEntity]), ErrorHandlerModule],
})
export class AuthModule {}
