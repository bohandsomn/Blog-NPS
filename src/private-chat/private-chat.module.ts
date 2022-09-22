import { Module } from '@nestjs/common'
import { TokenModule } from 'src/token/token.module'
import { PrivateChatController } from './private-chat.controller'
import { PrivateChatService } from './private-chat.service'

@Module({
  controllers: [PrivateChatController],
  providers: [PrivateChatService],
  imports: [TokenModule]
})
export class PrivateChatModule {}
