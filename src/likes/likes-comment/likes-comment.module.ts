import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Comment } from 'src/comment/comment.model'
import { User } from 'src/user/user.model'
import { LikesCommentController } from './likes-comment.controller'
import { LikesComment } from './likes-comment.model'
import { LikesCommentService } from './likes-comment.service'

@Module({
  controllers: [LikesCommentController],
  providers: [LikesCommentService],
  imports: [SequelizeModule.forFeature([LikesComment, User, Comment])]
})
export class LikesCommentModule {}
