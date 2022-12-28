import { UserModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { PostModule } from './posts/post.module';
import { FridgeModule } from './fridge/fridge.module';
import { CommentModule } from './comments/comment.module';
import { BasketModule } from './basket/basket.module';
import { ENTITIES_PATH } from './definitions';
dotenv.config();

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
      entities: [ENTITIES_PATH],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    FridgeModule,
    CommentModule,
    BasketModule,
  ],
})
export class AppModule {}
