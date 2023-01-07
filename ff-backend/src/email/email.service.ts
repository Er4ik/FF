import { Injectable } from '@nestjs/common';
import {
  EmailOptions,
  EmailProvider,
  EmailResponse,
} from './interfaces/email.interface';

@Injectable()
export class EmailService {
  constructor(private readonly emailProvider: EmailProvider) {}

  async sendEmail(options: EmailOptions): Promise<EmailResponse> {
    //const result = await this.emailProvider.sendEmail(options);

    return options;
  }
}
