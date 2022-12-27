import { Injectable } from '@nestjs/common';

@Injectable()
export class FridgeService {
  getHello(): string {
    return 'Hello World from Fridge Service!';
  }
}
