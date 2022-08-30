import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Chat } from 'src/chat/chat.model'
import { PhotoChatController } from './photo-chat.controller'
import { PhotoChat } from './photo-chat.model'
import { PhotoChatService } from './photo-chat.service'

@Module({
  controllers: [PhotoChatController],
  providers: [PhotoChatService],
  imports: [SequelizeModule.forFeature([PhotoChat, Chat])]
})
export class PhotoChatModule {}
