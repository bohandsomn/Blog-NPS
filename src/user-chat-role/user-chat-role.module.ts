import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModule } from 'src/token/token.module'
import { User } from 'src/user/user.model'
import { UserModule } from 'src/user/user.module'
import { UserChatRoleController } from './user-chat-role.controller'
import { UserChatRole } from './user-chat-role.model'
import { UserChatRoleService } from './user-chat-role.service'
import { UserRole } from './user-role.model'

@Module({
  controllers: [UserChatRoleController],
  providers: [UserChatRoleService],
  imports: [
    SequelizeModule.forFeature([UserChatRole, UserRole, User]),
    TokenModule,
    UserModule
  ],
  exports: [UserChatRoleService]
})
export class UserChatRoleModule {}
