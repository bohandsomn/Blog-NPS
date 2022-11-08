import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { Chat } from 'src/chat/chat.model'
import { ChatService } from 'src/chat/chat.service'
import { PrivateChatCreateDTO } from './DTO/private-chat-create.dto'
import { PrivateChatDeleteDTO } from './DTO/private-chat-delete.dto'
import { PrivateChatGetOneDTO } from './DTO/private-chat-get-one.dto'
import { PrivateChatUpdateDTO } from './DTO/private-chat-update.dto'

@Injectable()
export class PrivateChatService {
    constructor(
        private readonly chatServise: ChatService,
        private readonly i18nService: I18nService
    ) { }

    async create(dto: PrivateChatCreateDTO) {
        const chat = await this.chatServise.create({name: this.i18nService.t('default.private-chat.name'), userId: dto.userId})
        await this.chatServise.addUserToChat(dto.interlocutorId, chat.id)
        return chat
    }

    async getOne(dto: PrivateChatGetOneDTO) {
        const chat = await this.chatServise.getOnePrivateChat(dto.interlocutorId, dto.userId)
        return chat
    }

    async update(dto: PrivateChatUpdateDTO) {
        const chat = await this.chatServise.getOne(dto.id)
        await this.verify(chat.id, dto.userId)
        chat.name = dto.name
        await chat.save()
        return chat
    }

    async delete(dto: PrivateChatDeleteDTO) {
        const chat = await this.chatServise.getOne(dto.id)
        await this.verify(chat.id, dto.userId)
        return await chat.destroy()
    }

    private async verify(chatId: number, userId: number) {
        const usersChat = await this.chatServise.getUsersByChatId(chatId)
        for (const userChat of usersChat) {
            if (userChat.userId === userId) {
                return
            }
        }
        throw new HttpException(this.i18nService.t('exception.private-chat.verify.not-access'), HttpStatus.FORBIDDEN)
    }
}
