import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtService } from '@nestjs/jwt'
import { Chat } from 'src/chat/chat.model'
import { UserChat } from 'src/chat/user-chat.model'
import { PhotoUser } from 'src/photo/photo-user/photo-user.model'
import { Privacy } from 'src/privacy/privacy.model'
import { PrivacyModule } from 'src/privacy/privacy.module'
import { UserChatRole } from './user-chat-role.model'
import { UserRole } from './user-role.model'
import { UserController } from './user.controller'
import { User } from './user.model'
import { UserService } from './user.service'
import { UserPasswordService } from './user-password.service'
import { TokenModule } from 'src/token/token.module'

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService, UserPasswordService],
  imports: [
    SequelizeModule.forFeature([User, Privacy, PhotoUser, Chat, UserChat, UserChatRole, UserRole]),
    PrivacyModule,
    forwardRef(() => TokenModule)
  ],
  exports: [UserService, UserPasswordService]
})
export class UserModule {}
