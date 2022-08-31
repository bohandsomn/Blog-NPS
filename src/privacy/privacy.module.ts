import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Chat } from 'src/chat/chat.model'
import { User } from 'src/user/user.model'
import { Privacy } from './privacy.model'
import { PrivacyService } from './privacy.service'
import { PrivacyController } from './privacy.controller';

@Module({
    imports: [SequelizeModule.forFeature([Privacy, User, Chat])],
    providers: [PrivacyService],
    exports: [PrivacyService],
    controllers: [PrivacyController]
})
export class PrivacyModule {}
