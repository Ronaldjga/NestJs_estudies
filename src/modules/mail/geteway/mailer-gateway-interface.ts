export interface IMailerGateway {
  Welcome(user: string, to: string): Promise<void>;
  SendEmailTo({
    to,
    subject,
    template,
  }: {
    to: string;
    subject: string;
    template: string;
  }): Promise<void>;
}
