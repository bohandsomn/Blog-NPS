import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { Activation } from './activation.model'

@Module({
    imports: [SequelizeModule.forFeature([Activation, User])]
})
export class ActivationModule {}
