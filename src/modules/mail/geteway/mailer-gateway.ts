import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailerGateway } from './mailer-gateway-interface';
import { ICustomEmail } from '../dto/customEmail';

@Injectable()
export class MailerGateway implements IMailerGateway {
  constructor(private mailerService: MailerService) {}

  async Welcome(user: string, to: string): Promise<void> {
    await this.mailerService.sendMail({
      to: to,
      from: process.env.MAILER_USER,
      subject: `Bem-vindo ${user} ao Projeto Groups em NestJs, criado por Ronaldjga`,
      html: `
                <h1 style="color:red;">Bem-vindo</h1>
                <p>Muito obrigado por se registrar no Groups, um projeto desenvolvido por Ronaldjga. O intuito do Groups é permitir reunir pessoas de forma organizada para elevar a comunicação pessoal e empresarial.</p>
            `,
    });
  }

  async SendEmailTo(customEmail: ICustomEmail): Promise<void> {
    await this.mailerService.sendMail({
      to: customEmail.to,
      from: process.env.MAILER_USER,
      subject: customEmail.subject,
      html: customEmail.template,
    });
  }
}
