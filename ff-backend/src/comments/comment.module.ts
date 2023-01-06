import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentEntity } from './entitites/comment.entity';
import { PostEntity } from '../posts/entitites/post.entity';
import { UserEntity } from '../users/entitites/user.entity';
import { ErrorHandlerModule } from '../shared/helpers/error-handler/error-handler.module';
import { LoggerModule } from '../shared/helpers/logger/logger.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([CommentEntity, UserEntity, PostEntity]),
    LoggerModule,
    ErrorHandlerModule,
  ],
})
export class CommentModule {}
