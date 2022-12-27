import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from './users/entitites/user.entity';
import { PostsEntity } from './posts/entitites/posts.entity';
import { FridgeEntity } from './fridge/entitites/fridge.entity';
import { PostsMediaEntity } from './posts/entitites/posts-media.entity';
import { UserController } from './users/user.controller';
import { PostsController } from './posts/posts.controller';
import { FridgeController } from './fridge/fridge.controller';
import { CommentsController } from './comments/comments.controller';
import { BasketController } from './basket/basket.controller';
import { UserService } from './users/user.service';
import { PostsService } from './posts/posts.service';
import { FridgeService } from './fridge/fridge.service';
import { CommentsService } from './comments/comments.service';
import { BasketService } from './basket/basket.service';
dotenv.config();

@Module({
  controllers: [
    UserController,
    PostsController,
    FridgeController,
    CommentsController,
    BasketController,
  ],
  providers: [
    UserService,
    PostsService,
    FridgeService,
    CommentsService,
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
      entities: [UserEntity, PostsEntity, PostsMediaEntity, FridgeEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
