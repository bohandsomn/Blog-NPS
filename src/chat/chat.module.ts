import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Privacy } from 'src/privacy/privacy.model'
import { PrivacyModule } from 'src/privacy/privacy.module'
import { TokenModule } from 'src/token/token.module'
import { UserChatRoleModule } from 'src/user-chat-role/user-chat-role.module'
import { User } from 'src/user/user.model'
import { UserModule } from 'src/user/user.module'
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
    PrivacyModule,
    UserModule,
    UserChatRoleModule
  ],
  exports: [ChatService]
})
export class ChatModule {}
