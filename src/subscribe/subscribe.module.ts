import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { SubscribeController } from './subscribe.controller'
import { Subscribe } from './subscribe.model'
import { SubscribeService } from './subscribe.service'

@Module({
  controllers: [SubscribeController],
  providers: [SubscribeService],
  imports: [SequelizeModule.forFeature([Subscribe, User])]
})
export class SubscribeModule {}
