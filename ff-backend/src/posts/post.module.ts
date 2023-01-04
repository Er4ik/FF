import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from './entitites/post.entity';
import { PostMediaEntity } from './entitites/post-media.entity';
import { PostLikeEntity } from './entitites/post-likes.entity';
import { LoggerModule } from '../shared/helpers/logger/logger.module';
import { ErrorHandlerModule } from '../shared/helpers/error-handler/error-handler.module';
import { UserEntity } from '../users/entitites/user.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
      PostMediaEntity,
      PostLikeEntity,
      UserEntity,
    ]),
    LoggerModule,
    ErrorHandlerModule,
  ],
})
export class PostModule {}
