import { Module } from '@nestjs/common'
import { Chat } from 'src/chat/chat.model'
import { User } from 'src/user/user.model'
import { Message } from './message.model'
import { MessageGateway } from './message.gateway'
import { SequelizeModule } from '@nestjs/sequelize'
import { MessageService } from './message.service';
import { PaginationModule } from 'src/pagination/pagination.module'

@Module({
    imports: [
        SequelizeModule.forFeature([Message, Chat, User]),
        PaginationModule
    ],
    providers: [MessageGateway, MessageService],
    exports: [MessageGateway],
})
export class MessageModule {}
