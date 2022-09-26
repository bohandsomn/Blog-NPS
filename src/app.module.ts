import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import * as path from 'path'
import { I18nModule } from 'nestjs-i18n'
import { MailerModule } from '@nestjs-modules/mailer'

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
import { PrivacyModule } from './privacy/privacy.module'
import { ActivationModule } from './activation/activation.module'
import { MessageModule } from './message/message.module'

import { User } from './user/user.model'
import { Privacy } from './privacy/privacy.model'
import { PhotoUser } from './photo/photo-user/photo-user.model'
import { Activation } from './activation/activation.model'
import { Token } from './token/token.model'
import { Subscribe } from './subscribe/subscribe.model'
import { Chat } from './chat/chat.model'
import { UserChat } from './chat/user-chat.model'
import { PhotoChat } from './photo/photo-chat/photo-chat.model'
import { Message } from './message/message.model'
import { Post } from './post/post.model'
import { Comment } from './comment/comment.model'
import { LikesComment } from './likes/likes-comment/likes-comment.model'
import { LikesPost } from './likes/likes-post/likes-post.model'
import { UserChatRole } from './user-chat-role/user-chat-role.model'
import { UserRole } from './user-chat-role/user-role.model'
import { MailModule } from './mail/mail.module'
import { UserChatRoleModule } from './user-chat-role/user-chat-role.module'
import { StyleFileModule } from './style-file/style-file.module'
import { PrivateChatModule } from './private-chat/private-chat.module';

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
    PrivacyModule,
    ActivationModule,
    MessageModule,
    MailModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    UserChatRoleModule,
    StyleFileModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Privacy, PhotoUser, Activation, Token, Subscribe, Chat, UserChat, PhotoChat, Message, Post, Comment, LikesComment, LikesPost, UserChatRole, UserRole],
      autoLoadModels: true,
      ...(process.env.NODE_ENV === 'production' && {
        dialectOptions: {
          ssl: {
            rejectUnauthorized: false
          }
        }
      })
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-*': 'en',
        'ua-*': 'ua',
        'ru-*': 'ru',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.TRANSPORT_HOST,
        port: parseInt(process.env.TRANSPORT_PORT),
        secure: false,
        auth: {
          user: process.env.TRANSPORT_AUTH_USER,
          pass: process.env.TRANSPORT_AUTH_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      }
    }),
    PrivateChatModule
  ]
})
export class AppModule {}
