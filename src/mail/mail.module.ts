import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailService } from './mail.service'

@Module({
  providers: [MailService],
  imports: [],
  exports: [MailService]
})
export class MailModule {}
