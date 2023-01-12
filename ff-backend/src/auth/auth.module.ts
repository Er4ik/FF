import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandlerModule } from '../shared/helpers/error-handler/error-handler.module';
import { UserEntity } from '../user/entitites/user.entity';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ErrorHandlerModule,
    PassportModule,
  ],
})
export class AuthModule {}
