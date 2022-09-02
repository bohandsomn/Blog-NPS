import { Module } from '@nestjs/common'
import { SubscribeModule } from 'src/subscribe/subscribe.module'
import { TokenModule } from 'src/token/token.module'
import { FriendshipsController } from './friendships.controller'
import { FriendshipsService } from './friendships.service'

@Module({
  controllers: [FriendshipsController],
  providers: [FriendshipsService],
  imports: [TokenModule, SubscribeModule]
})
export class FriendshipsModule {}
