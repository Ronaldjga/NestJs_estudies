import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailerGateway } from '../geteway/mailer-gateway';

@Injectable()
export class MailService {
    constructor(
        private mailerGateway: MailerGateway
    ){}

    async sendWelcome({user, email} : {user: string, email: string}): Promise<void> {
        await this.mailerGateway.Welcome(user, email)
    }

    async sendEmailTo(customEmail){
        await this.mailerGateway.SendEmailTo(customEmail)
    }
}
