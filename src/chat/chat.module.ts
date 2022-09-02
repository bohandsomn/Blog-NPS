import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Privacy } from 'src/privacy/privacy.model'
import { PrivacyModule } from 'src/privacy/privacy.module'
import { TokenModule } from 'src/token/token.module'
import { User } from 'src/user/user.model'
import { ChatController } from './chat.controller'
import { Chat } from './chat.model'
import { ChatService } from './chat.service'
import { UserChat } from './user-chat.model'

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [
    SequelizeModule.forFeature([Chat, Privacy, User, UserChat]),
    TokenModule,
    PrivacyModule
  ]
})
export class ChatModule {}
