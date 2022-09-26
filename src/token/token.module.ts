import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtService } from '@nestjs/jwt'
import { JwtModule } from '@nestjs/jwt'
import { User } from 'src/user/user.model'
import { Token } from './token.model'
import { TokenService } from './token.service'
import { JwtStrategy } from './jwt.strategy'
import { ActivationModule } from 'src/activation/activation.module'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [
        SequelizeModule.forFeature([Token, User]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET'
        }),
        ActivationModule,
        forwardRef(() => UserModule)
    ],
    providers: [TokenService, JwtStrategy],
    exports: [TokenService]
})
export class TokenModule {}
