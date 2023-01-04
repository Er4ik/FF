import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ErrorHandlerService {
  constructor(private readonly logger: LoggerService) {}

  handle(error) {
    if (error instanceof HttpException) {
      this.logger.error(error.message);
      throw new HttpException(`${error.message}`, error.getStatus());
    }

    this.logger.error(error);
    throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
