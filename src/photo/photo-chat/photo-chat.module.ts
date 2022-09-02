import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Chat } from 'src/chat/chat.model'
import { ChatModule } from 'src/chat/chat.module'
import { TokenModule } from 'src/token/token.module'
import { UserModule } from 'src/user/user.module'
import { PhotoChatController } from './photo-chat.controller'
import { PhotoChat } from './photo-chat.model'
import { PhotoChatService } from './photo-chat.service'

@Module({
  controllers: [PhotoChatController],
  providers: [PhotoChatService],
  imports: [
    SequelizeModule.forFeature([PhotoChat, Chat]),
    TokenModule,
    UserModule,
    ChatModule
  ]
})
export class PhotoChatModule {}
