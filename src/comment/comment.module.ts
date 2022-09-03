import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Post } from 'src/post/post.model'
import { TokenModule } from 'src/token/token.module'
import { User } from 'src/user/user.model'
import { CommentController } from './comment.controller'
import { Comment } from './comment.model'
import { CommentService } from './comment.service'

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    SequelizeModule.forFeature([Comment, User, Post]),
    TokenModule
  ]
})
export class CommentModule {}
