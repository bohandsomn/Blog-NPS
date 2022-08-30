import { Module } from '@nestjs/common'
import { LikesCommentModule } from './likes-comment/likes-comment.module'
import { LikesPostModule } from './likes-post/likes-post.module'

@Module({
  imports: [LikesCommentModule, LikesPostModule]
})
export class LikesModule {}
