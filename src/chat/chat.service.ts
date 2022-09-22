import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { I18nService } from 'nestjs-i18n'
import { PrivacyService } from 'src/privacy/privacy.service'
import { UserChatRoleService } from 'src/user-chat-role/user-chat-role.service'
import { User } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'
import { Chat } from './chat.model'
import { ChatCreateDTO } from './DTO/chat-create.dto'
import { ChatUpdateDTO } from './DTO/chat-update.dto'
import { UserChat } from './user-chat.model'

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat) private readonly chatRepository: typeof Chat,
        @InjectModel(UserChat) private readonly userChatRepository: typeof UserChat,
        private readonly privacyService: PrivacyService,
        private readonly userService: UserService,
        private readonly userChatRoleService: UserChatRoleService,
        private readonly i18nService: I18nService
    ) { }

    async create(dto: ChatCreateDTO & {userId: number}) {
        const privacy = await this.privacyService.getByValue('PRIVATE')
        const chat = await this.chatRepository.create({name: dto.name, privacyId: privacy.id})
        await this.userChatRoleService.addRoleToUser(dto.userId)
        await this.addUserToChat(dto.userId, chat.id)
        return chat
    }

    async getOne(id: number) {
        const chat = await this.chatRepository.findByPk(id)
        if (!chat) {
            throw new HttpException(this.i18nService.t<string>("exception.chat.get-one.not-found"), HttpStatus.NOT_FOUND)
        }
        return chat
    }

    async getMany(userId: number) {
        return this.userService.getChats(userId)
    }

    async update(dto: ChatUpdateDTO) {
        const chat = await this.getOne(dto.id)
        const privacy = await this.privacyService.getByValue(dto.privacy)
        chat.privacyId = privacy.id
        chat.name = dto.name
        await chat.save()
        return chat
    }

    async delete(id: number) {
        await this.userChatRepository.destroy({where: {chatId: id}})
        return this.chatRepository.destroy({where: {id}})
    }

    async addUserToChat(userId: number, chatId: number) {
        await this.userChatRepository.create({
            userId: userId,
            chatId: chatId
        })
    }
}
