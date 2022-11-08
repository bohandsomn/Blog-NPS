import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { PaginationModule } from 'src/pagination/pagination.module'
import { Privacy } from 'src/privacy/privacy.model'
import { PrivacyModule } from 'src/privacy/privacy.module'
import { TokenModule } from 'src/token/token.module'
import { User } from 'src/user/user.model'
import { PostController } from './post.controller'
import { Post } from './post.model'
import { PostService } from './post.service'

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    SequelizeModule.forFeature([Post, Privacy, User]),
    PrivacyModule,
    TokenModule,
    PaginationModule
  ]
})
export class PostModule {}
