import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketEntity } from './entitites/basket.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity)
    private commentRepository: Repository<BasketEntity>,
  ) {}

  async getHello(): Promise<string> {
    return 'Hello World from Basket Service!';
  }
}
