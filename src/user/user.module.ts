import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Chat } from 'src/chat/chat.model'
import { UserChat } from 'src/chat/user-chat.model'
import { PhotoUser } from 'src/photo/photo-user/photo-user.model'
import { Privacy } from 'src/privacy/privacy.model'
import { UserChatRole } from './user-chat-role.model'
import { UserRole } from './user-role.model'
import { UserController } from './user.controller'
import { User } from './user.model'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User, Privacy, PhotoUser, Chat, UserChat, UserChatRole, UserRole])]
})
export class UserModule {}
