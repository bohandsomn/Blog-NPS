import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { I18nService } from 'nestjs-i18n'
import { UserService } from 'src/user/user.service'
import { UserChatRoleCreateDTO } from './DTO/user-chat-role-create.dto'
import { UserChatRole } from './user-chat-role.model'

@Injectable()
export class UserChatRoleService {
    constructor(
        @InjectModel(UserChatRole) private readonly userChatRoleRepository: typeof UserChatRole,
        private readonly userService: UserService,
        private readonly i18nService: I18nService
    ) { }

    async create(dto: UserChatRoleCreateDTO) {
        await this.verify(dto.value)
        return this.userChatRoleRepository.create(dto)
    }

    async getByValue(value: string) {
        return this.userChatRoleRepository.findOne({where: {value}})
    }

    async verify(value: string, mustHave = false) {
        const hasRole = !!await this.getByValue(value)
        if (hasRole !== mustHave) {
            throw new HttpException(this.i18nService.t<string>('exception.user-chat-role.verify.has-value'), HttpStatus.CONFLICT)
        }
    }

    async addRoleToUser(userId: number, value = 'ADMIN') {
        await this.verify(value, true)
        await this.userService.idVerify(userId, true)
        const role = await this.getByValue(value)
        const user = await this.userService.getByPk(userId)
        await user.$add('role', role.id)
    }
}
