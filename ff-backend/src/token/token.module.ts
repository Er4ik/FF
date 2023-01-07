import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entitites/user.entity';
import { UserController } from '../user/user.controller';
import { TokenEntity } from './entitites/token.entitites';
import { TokenService } from './token.service';

@Module({
  controllers: [UserController],
  providers: [TokenService],
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity])],
})
export class TokenModule {}
