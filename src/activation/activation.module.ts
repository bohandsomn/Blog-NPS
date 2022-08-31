import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { Activation } from './activation.model'
import { ActivationService } from './activation.service'

@Module({
    imports: [SequelizeModule.forFeature([Activation, User])],
    providers: [ActivationService],
    exports: [ActivationService]
})
export class ActivationModule {}
