import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from './users/entitites/user.entity';
import { PostEntity } from './posts/entitites/post.entity';
import { FridgeEntity } from './fridge/entitites/fridge.entity';
import { PostMediaEntity } from './posts/entitites/post-media.entity';
import { UserController } from './users/user.controller';
import { PostController } from './posts/post.controller';
import { FridgeController } from './fridge/fridge.controller';
import { CommentController } from './comments/comment.controller';
import { BasketController } from './basket/basket.controller';
import { UserService } from './users/user.service';
import { PostService } from './posts/post.service';
import { FridgeService } from './fridge/fridge.service';
import { CommentService } from './comments/comment.service';
import { BasketService } from './basket/basket.service';
import { BasketEntity } from './basket/entitites/basket.entity';
import { CommentEntity } from './comments/entitites/comment.entity';
import { PostLikeEntity } from './posts/entitites/post-likes.entity';
import { followerUser } from './users/entitites/user-follower.entity';
dotenv.config();

@Module({
  controllers: [
    UserController,
    PostController,
    FridgeController,
    CommentController,
    BasketController,
  ],
  providers: [
    UserService,
    PostService,
    FridgeService,
    CommentService,
    BasketService,
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
      entities: [
        UserEntity,
        PostEntity,
        PostMediaEntity,
        FridgeEntity,
        BasketEntity,
        CommentEntity,
        PostLikeEntity,
        followerUser,
      ],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
