import { Module } from '@nestjs/common'
import { Chat } from 'src/chat/chat.model'
import { User } from 'src/user/user.model'
import { Message } from './message.model'

@Module({
    imports: [Message, Chat, User]
})
export class MessageModule {}
