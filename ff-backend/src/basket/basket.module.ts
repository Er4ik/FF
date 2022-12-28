import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { BasketEntity } from './entitites/basket.entity';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [TypeOrmModule.forFeature([BasketEntity])],
})
export class BasketModule {}
