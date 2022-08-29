import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { AuthorizationModule } from './authorization/authorization.module'
import { ChatModule } from './chat/chat.module'
import { CommentModule } from './comment/comment.module'
import { PhotoModule } from './photo/photo.module'
import { PostModule } from './post/post.module'
import { LikesModule } from './likes/likes.module'
import { StyleModule } from './style/style.module'
import { UserModule } from './user/user.module'
import { FriendshipsModule } from './friendships/friendships.module'
import { SubscribeModule } from './subscribe/subscribe.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    AuthorizationModule, 
    ChatModule, 
    CommentModule, 
    PhotoModule, 
    PostModule, 
    LikesModule, 
    StyleModule, 
    UserModule, 
    FriendshipsModule, 
    SubscribeModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        // models: [],
        autoLoadModels: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
