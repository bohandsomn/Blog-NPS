import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { PhotoUserController } from './photo-user.controller'
import { PhotoUser } from './photo-user.model'
import { PhotoUserService } from './photo-user.service'

@Module({
  controllers: [PhotoUserController],
  providers: [PhotoUserService],
  imports: [SequelizeModule.forFeature([PhotoUser, User])]
})
export class PhotoUserModule {}
