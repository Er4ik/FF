import { Controller, Get } from '@nestjs/common';
import { FridgeService } from './fridge.service';

@Controller('fridge')
export class FridgeController {
  constructor(private readonly fridgeService: FridgeService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.fridgeService.getHello();
  }
}
