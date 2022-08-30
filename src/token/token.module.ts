import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { Token } from './token.model'

@Module({
    imports: [SequelizeModule.forFeature([Token, User])]
})
export class ActivationModule {}
