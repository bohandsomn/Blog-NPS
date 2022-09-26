import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as FileSystem from 'fs'
import { I18nService } from 'nestjs-i18n'
import * as path from 'path'
import { ChatService } from 'src/chat/chat.service'
import { UserService } from 'src/user/user.service'
import { PhotoResizePipe } from '../transformation/photo-resize.pipe'
import { PhotoChatCreateDTO } from './DTO/photo-chat-create.dto'
import { PhotoChatDeleteDTO } from './DTO/photo-chat-delete.dto'
import { PhotoChatGetDTO } from './DTO/photo-chat-get.dto'
import { PhotoChatUpdateDTO } from './DTO/photo-chat-update.dto'
import { PhotoChat } from './photo-chat.model'

@Injectable()
export class PhotoChatService {
    constructor(
        @InjectModel(PhotoChat) private readonly photoChatRepository: typeof PhotoChat,
        private readonly i18nService: I18nService,
        private readonly userService: UserService,
        private readonly chatService: ChatService,
    ) { }

    async getPreview(dto: PhotoChatGetDTO) {
        const photo = await this.getByChatId(parseInt(dto.chatId))
        if (!photo) {
            throw new HttpException(this.i18nService.t<string>('exception.photo-chat.get-by-user-id.not-found'), HttpStatus.NOT_FOUND)
        }
        return this.getStream(photo.preview)
    }

    async create(dto: PhotoChatCreateDTO) {
        const photo = await this.getByChatId(dto.chatId)
        if (photo) {
            throw new HttpException(this.i18nService.t<string>('exception.photo-chat.create.has-id'), HttpStatus.CONFLICT)
        }

        return this.photoChatRepository.create(dto)
    }

    async update(dto: PhotoChatUpdateDTO) {
        const photo = await this.getByChatId(dto.chatId)
        if (!photo) {
            return await this.create(dto)
        }
        
        photo.preview = dto.preview

        await photo.save()
        return photo
    }

    async delete(dto: PhotoChatDeleteDTO) {
        const chats = await this.userService.getChats(dto.userId)
        const deletedChat = await this.chatService.getOne(parseInt(dto.chatId))

        for (const chat of chats) {
            if (chat.id === deletedChat.id) {
                return await this.photoChatRepository.destroy({where: {chatId: parseInt(dto.chatId)}})
            }
        }
    }

    private getStream(filePath: string) {
        const fullPath = path.join(PhotoResizePipe.staticPath, filePath)
        if (!FileSystem.existsSync(fullPath)) {
            throw new HttpException(this.i18nService.t<string>('exception.photo-chat.get-stream.has-file-path'), HttpStatus.NOT_FOUND)
        }
        return FileSystem.createReadStream(fullPath)
    }

    private async getByChatId(chatId: number) {
        const photo = await this.photoChatRepository.findOne({where: {chatId}})
        return photo
    }
}
