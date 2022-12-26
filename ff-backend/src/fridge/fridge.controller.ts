import { Controller, Get } from '@nestjs/common';
import { FridgeService } from './fridge.service';

@Controller('fridge')
export class FridgeController {
  constructor(private readonly fridgeService: FridgeService) {}

  @Get()
  getHello(): string {
    return this.fridgeService.getHello();
  }
}
