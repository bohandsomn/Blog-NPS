import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { JwtService } from '@nestjs/jwt'
import { I18nService } from 'nestjs-i18n'
import { CreateTokenDTO } from './DTO/create-token.dto'
import { Token } from './token.model'
import { User } from 'src/user/user.model'
import { ActivationService } from 'src/activation/activation.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token) private readonly tokenRepository: typeof Token,
        private readonly jwtService: JwtService,
        private readonly activationService: ActivationService,
        private readonly i18nService: I18nService,
        private readonly userService: UserService
    ) { }

    generate(dto: CreateTokenDTO) {
        const accessToken = this.jwtService.sign(dto, {secret: this.getSecret('ACCESS'), expiresIn: '15m'})
        const refreshToken = this.jwtService.sign(dto, {secret: this.getSecret('REFRESH'), expiresIn: '24h'})

        return {
            refreshToken,
            accessToken
        }
    }

    async save(userId: number, tokens: ReturnType<TokenService['generate']>) {
        const token = await this.tokenRepository.findOne({where: {value: tokens.refreshToken}})
        if (!token) {
            const token = await this.tokenRepository.create({userId, value: tokens.refreshToken})
            return token
        }

        token.value = tokens.refreshToken
        await token.save()
        
        return token
    }

    async create(dto: CreateTokenDTO) {
        const tokens = this.generate(dto)
        return this.save(dto.id, tokens)
    }

    async refresh(refreshToken: string | undefined) {
        if (refreshToken === undefined) {
            throw new HttpException(this.i18nService.t<string>("exception.token.refresh.empty-token"), HttpStatus.UNAUTHORIZED)
        }

        const { id } = await this.verify(refreshToken, 'REFRESH')
        await this.userService.idVerify(id, true)
        const user = await this.userService.getByPk(id)

        const activation = await this.activationService.getById(user.id)
        const createTokenDTO = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            login: user.login,
            birthday: user.birthday,
            privacyId: user.privacyId,
            isActivation: activation.value
        }
        const tokens = this.generate(createTokenDTO)
        await this.save(user.id, tokens)

        return {
            token: tokens,
            user: createTokenDTO
        }
    }

    async verify(token: string, type: 'REFRESH' | 'ACCESS') {
        const secret = this.getSecret(type)
        const user = this.jwtService.verify<User>(token, {secret})
        return user
    }

    async delete(refreshToken: string) {
        await this.tokenRepository.destroy({where: {value: refreshToken}})
    }

    split(authorization: string) {
        const [bearer, token] = authorization.split(' ')

        if (bearer !== 'Bearer' || token === undefined) {
            throw new UnauthorizedException({message: this.i18nService.t("exception.token.split.unauthorized")})
        }

        return token
    }

    getSecret(type: 'REFRESH' | 'ACCESS') {
        const secret = type === 'ACCESS' ? process.env.JWT_ACCESS_SECRET_KEY : process.env.JWT_REFRESH_SECRET_KEY
        return secret
    }
}
