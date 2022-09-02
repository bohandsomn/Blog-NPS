import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly privacyService: PrivacyService,
        private readonly userPasswordService: UserPasswordService,
        private readonly i18nService: I18nService
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
        await this.emailVerify(dto.email)
        await this.loginVerify(dto.login)

        user.name = dto.name
        user.surname = dto.surname
        user.email = dto.email
        user.login = dto.login
        user.birthday = dto.birthday
        user.privacyId = privacy.id

        await user.save()
        return user
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
