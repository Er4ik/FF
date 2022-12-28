import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FridgeEntity } from './entitites/fridge.entity';

@Injectable()
export class FridgeService {
  constructor(
    @InjectRepository(FridgeEntity)
    private fridgeRepository: Repository<FridgeEntity>,
  ) {}

  async getHello(): Promise<string> {
    return 'Hello World from Fridge Service!';
  }
}
