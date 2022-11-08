import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { PaginationService } from 'src/pagination/pagination.service'
import { MessageCreateDTO } from './DTO/message-create.dto'
import { MessageGetManyDTO } from './DTO/message-get-many.dto'
import { Message } from './message.model'

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message) private readonly messageRepository: typeof Message,
        private readonly paginationService: PaginationService
    ) { }

    async create(dto: MessageCreateDTO) {
        return this.messageRepository.create(dto)
    }

    async getOne(messageId: number) {
        return this.messageRepository.findByPk(messageId)
    }

    async getMany(dto: MessageGetManyDTO) {
        return this.messageRepository
            .findAll({where: {chatId: dto.chatId}, order: [['id', 'DESC']]})
            .then(this.paginationService.slice(dto.page, 10))
    }
}
