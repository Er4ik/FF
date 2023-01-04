import { Logger, Injectable } from '@nestjs/common';
import { LoggerLevelsEnum } from '../../models/logger';

@Injectable()
export class LoggerService {
  private logger = new Logger();
  private store: { level: string; message: string }[] = [];
  private maxStoreLength = 100;

  private async updateStore(level: string, message: string): Promise<void> {
    this.store.push({ level, message });
    if (this.store.length > this.maxStoreLength) {
      this.store.shift();
    }
    return;
  }

  error(message: string): void {
    this.logger.error(message);
    (async () => {
      await this.updateStore(LoggerLevelsEnum.ERROR, message);
    })();
    return;
  }

  warning(message: string): void {
    this.logger.warn(message);
    (async () => {
      await this.updateStore(LoggerLevelsEnum.WARNING, message);
    })();
    return;
  }

  info(message: string): void {
    this.logger.log(message);
    (async () => {
      await this.updateStore(LoggerLevelsEnum.INFO, message);
    })();
    return;
  }
}
