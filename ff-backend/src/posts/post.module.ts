import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from './entitites/post.entity';
import { PostMediaEntity } from './entitites/post-media.entity';
import { PostLikeEntity } from './entitites/post-likes.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([PostEntity, PostMediaEntity, PostLikeEntity]),
  ],
})
export class PostModule {}
