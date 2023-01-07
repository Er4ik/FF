export interface EmailProvider {
  sendMail(options: EmailOptions): Promise<EmailResponse>;
}

export interface EmailOptions {
  to: string | string[];
  html: string;
  from?: string;
  text?: string;
}

//export interface EmailResponse {}
