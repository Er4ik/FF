import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { ErrorHandlerService } from './error-handler.service';

@Module({
  providers: [ErrorHandlerService],
  exports: [ErrorHandlerService],
  imports: [LoggerModule],
})
export class ErrorHandlerModule {}
