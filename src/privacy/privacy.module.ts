import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Chat } from 'src/chat/chat.model'
import { User } from 'src/user/user.model'
import { Privacy } from './privacy.model'

@Module({
    imports: [SequelizeModule.forFeature([Privacy, User, Chat])]
})
export class PrivacyModule {}
