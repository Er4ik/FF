import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { EmailOptions } from './dto/email.dto';
import * as nodemailer from 'nodemailer';
dotenv.config();

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      service: 'gmail',
      secure: true,
      auth: {
        user: `${process.env.SMTP_USER}`,
        pass: `${process.env.SMTP_PASSWORD}`,
      },
    });
  }

  async sendEmail({ to, link, text }: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Activate the website at ' + process.env.API_URL,
        text: text ?? '',
        html: `
            <div>
              <h1>Follow the link to activate it</h1>
              <a href="${link}">${link}</a>
            </div>
          `,
      });
    } catch (e) {
      console.error(
        'У меня нет номера для двухфакторной авторизации аккаунта. \nСсылка для ауетентификации аккаунта: ' +
          link,
      );
    }
  }
}
