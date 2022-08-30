import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Post } from 'src/post/post.model'
import { User } from 'src/user/user.model'
import { LikesPostController } from './likes-post.controller'
import { LikesPost } from './likes-post.model'
import { LikesPostService } from './likes-post.service'

@Module({
  controllers: [LikesPostController],
  providers: [LikesPostService],
  imports: [SequelizeModule.forFeature([LikesPost, Post, User])]
})
export class LikesPostModule {}
