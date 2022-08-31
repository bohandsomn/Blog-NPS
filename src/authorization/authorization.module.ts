import { Module } from '@nestjs/common'
import { ActivationModule } from 'src/activation/activation.module'
import { MailModule } from 'src/mail/mail.module'
import { TokenModule } from 'src/token/token.module'
import { UserModule } from 'src/user/user.module'
import { AuthorizationController } from './authorization.controller'
import { AuthorizationService } from './authorization.service'

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports: [
    UserModule, 
    TokenModule, 
    ActivationModule,
    MailModule
  ]
})
export class AuthorizationModule {}
