import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthorizationModule } from 'src/authorization/authorization.module'
import { TokenModule } from 'src/token/token.module'
import { User } from 'src/user/user.model'
import { SubscribeController } from './subscribe.controller'
import { Subscribe } from './subscribe.model'
import { SubscribeService } from './subscribe.service'

@Module({
  controllers: [SubscribeController],
  providers: [SubscribeService],
  imports: [SequelizeModule.forFeature([Subscribe, User]), TokenModule],
  exports: [SubscribeService]
})
export class SubscribeModule {}
