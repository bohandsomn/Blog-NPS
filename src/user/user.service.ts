import { HttpException, HttpStatus, Injectable, forwardRef } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { I18nService } from 'nestjs-i18n'

import { UpdateUserDTO } from './DTO/update-user.dto'
import { User } from './user.model'
import { PrivacyService } from 'src/privacy/privacy.service'
import { CreateUserDTO } from './DTO/create-user.dto'
import { UserPasswordService } from './user-password.service'
import { Chat } from 'src/chat/chat.model'
import { ActivationService } from 'src/activation/activation.service'
import { TokenService } from 'src/token/token.service'
import { UserResponseDTO } from './DTO/user-response.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly privacyService: PrivacyService,
        private readonly userPasswordService: UserPasswordService,
        private readonly i18nService: I18nService,
        private readonly activationService: ActivationService,
        @Inject(forwardRef(() => TokenService)) private readonly tokenService: TokenService
    ) { }

    async getPreview(fullname: string) {
        const fullnameFromDB = Sequelize.fn('concat', Sequelize.col('name'), ' ', Sequelize.col('surname'))

        const lowerFullnameFromDB = Sequelize.fn('lower', fullnameFromDB)
        const lowerFullname = Sequelize.fn('lower', `%${fullname}%`)

        const condition = Sequelize.where(lowerFullnameFromDB, Op.like, lowerFullname)

        const users = await this.userRepository.findAll({where: [condition]})
        return users
    }

    async update(dto: UpdateUserDTO & {id: number}) {
        const user = await this.userRepository.findByPk(dto.id)
        if (!user) {
            throw new HttpException(this.i18nService.t<string>("exception.user.update.not-found"), HttpStatus.NOT_FOUND)
        }

        const privacy = await this.privacyService.getByValue(dto.privacy)
        
        const candidateByEmail = await this.getByEmail(dto.email)
        const candidateByLogin = await this.getByLogin(dto.login)
        if (candidateByEmail.id !== user.id) {
            throw new HttpException(this.i18nService.t<string>("exception.user.id-verify.has-id"), HttpStatus.CONFLICT)
        }
        if (candidateByLogin.id !== user.id) {
            throw new HttpException(this.i18nService.t<string>("exception.user.email-verify.has-email"), HttpStatus.CONFLICT)    
        }

        user.name = dto.name
        user.surname = dto.surname
        user.email = dto.email
        user.login = dto.login
        user.birthday = dto.birthday
        user.privacyId = privacy.id

        await user.save()
        
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

    async create(dto: CreateUserDTO) {
        const privacy = await this.privacyService.getByValue('PUBLIC')
        const hashPassword = await this.userPasswordService.hash(dto.password)

        const user = await this.userRepository.create({
            name: dto.name,
            email: dto.email,
            login: dto.login,
            password: hashPassword,
            privacyId: privacy.id,
        })
        return user
    }

    async getOne(id: number): Promise<UserResponseDTO> {
        await this.idVerify(id, true)
        const user = await this.getByPk(id)
        const activation = await this.activationService.getById(user.id)
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            login: user.login,
            birthday: user.birthday,
            isActivation: activation.value
        }
    }

    async getByPk(id: number) {
        const candidate = await this.userRepository.findByPk(id)
        return candidate
    }

    async getByEmail(email: string) {
        const candidate = await this.userRepository.findOne({where: {email}})
        return candidate
    }

    async getByLogin(login: string) {
        const candidate = await this.userRepository.findOne({where: {login}})
        return candidate
    }

    async idVerify(id: number, mustHave = false) {
        const hasUser = !!await this.getByPk(id)
        if (hasUser !== mustHave) {
            throw new HttpException(this.i18nService.t<string>("exception.user.id-verify.has-id"), HttpStatus.CONFLICT)
        }
    }

    async emailVerify(email: string, mustHave = false) {
        const hasUser = !!await this.getByEmail(email)
        if (hasUser !== mustHave) {
            throw new HttpException(this.i18nService.t<string>("exception.user.email-verify.has-email"), HttpStatus.CONFLICT)
        }
    }

    async loginVerify(login: string, mustHave = false) {
        const hasUser = !!await this.getByLogin(login)
        if (hasUser !== mustHave) {
            throw new HttpException(this.i18nService.t<string>("exception.user.login-verify.has-login"), HttpStatus.CONFLICT)
        }
    }

    async getChats(userId: number) {
        const chats = await this.userRepository.findAll({
            include: {model: Chat},
            where: {id: userId}
        })
            .then((users) => {
                const [user] = users
                return user.chats
            })
        
        return chats
    }
}
