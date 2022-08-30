import { Module } from '@nestjs/common'
import { PhotoUserModule } from './photo-user/photo-user.module'
import { PhotoChatModule } from './photo-chat/photo-chat.module'

@Module({
  controllers: [],
  providers: [],
  imports: [PhotoUserModule, PhotoChatModule]
})
export class PhotoModule {}
