import { Injectable } from '@nestjs/common';

@Injectable()
export class BasketService {
  getHello(): string {
    return 'Hello World from Basket Service!';
  }
}
