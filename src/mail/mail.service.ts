import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    async sendActivationMail(to: string, link: string) {
        await this.mailerService.sendMail({
            from: process.env.TRANSPORT_AUTH_USER,
            to,
            subject: `Activate account on ${process.env.API_URL}`,
            html:
                `
                    <div>
                        <h1>To activate follow the link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}
