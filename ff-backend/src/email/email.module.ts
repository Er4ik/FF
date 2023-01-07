import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entitites/user.entity';
import { UserController } from '../user/user.controller';
import { EmailService } from './email.service';

@Module({
  controllers: [UserController],
  providers: [EmailService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class EmailModule {}
