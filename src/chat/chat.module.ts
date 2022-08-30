import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Privacy } from 'src/privacy/privacy.model'
import { User } from 'src/user/user.model'
import { ChatController } from './chat.controller'
import { Chat } from './chat.model'
import { ChatService } from './chat.service'
import { UserChat } from './user-chat.model'

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [SequelizeModule.forFeature([Chat, Privacy, User, UserChat])]
})
export class ChatModule {}
