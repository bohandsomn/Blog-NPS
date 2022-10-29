import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { ActivationService } from 'src/activation/activation.service'
import { MailService } from 'src/mail/mail.service'
import { TokenService } from 'src/token/token.service'
import { UserPasswordService } from 'src/user/user-password.service'
import { User } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'
import { AuthorizationLoginDTO } from './DTO/authorization-login.dto'
import { AuthorizationRegistrationDTO } from './DTO/authorization-registration.dto'

@Injectable()
export class AuthorizationService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly activationService: ActivationService,
        private readonly userPasswordService: UserPasswordService,
        private readonly mailService: MailService,
        private readonly i18nService: I18nService
    ) { }

    async registration(dto: AuthorizationRegistrationDTO) {
        await this.userService.emailVerify(dto.email)
        await this.userService.loginVerify(dto.login)

        const user = await this.userService.create(dto)
        const activation = await this.activationService.create(user.id)
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
        await this.tokenService.create(createTokenDTO)
        await this.mailService.sendActivationMail(user.email, `${process.env.API_URL}/authorization/activation/${user.id}`)

        const tokens = this.tokenService.generate(createTokenDTO)
        return {
            token: tokens,
            user: createTokenDTO
        }
    }

    async login(dto: AuthorizationLoginDTO) {
        await this.userService.loginVerify(dto.login, true)
        const user = await this.userService.getByLogin(dto.login)

        const passwordEquals = await this.userPasswordService.compare(dto.password, user.password)
        if (!passwordEquals) {
            throw new HttpException(this.i18nService.t<string>("exception.authorization.login.invalid-password"), HttpStatus.FORBIDDEN)
        }

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
        const token = this.tokenService.generate(createTokenDTO)

        return {
            token, 
            user: createTokenDTO
        }
    }

    async autoLogin(user: User) {
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
        const token = this.tokenService.generate(createTokenDTO)
        
        return {
            token,
            user: createTokenDTO
        }
    }

    async refresh(token: string) {
        return this.tokenService.refresh(token)
    }

    async logout(refreshToken: string) {
       return this.tokenService.delete(refreshToken)
    }

    async activation(userId: string) {
        this.activationService.activate(parseInt(userId))
    }
}
