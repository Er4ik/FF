import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { FridgeEntity } from './entitites/fridge.entity';

@Module({
  controllers: [FridgeController],
  providers: [FridgeService],
  imports: [TypeOrmModule.forFeature([FridgeEntity])],
})
export class FridgeModule {}
