import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { MessageCreateDTO } from './DTO/message-create.dto'
import { Message } from './message.model'

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message) private readonly messageRepository: typeof Message
    ) { }

    async create(dto: MessageCreateDTO) {
        return this.messageRepository.create(dto)
    }

    async getOne(messageId: number) {
        return this.messageRepository.findByPk(messageId)
    }

    async getMany(chatId: number) {
        return this.messageRepository.findAll({where: {chatId}})
    }
}
