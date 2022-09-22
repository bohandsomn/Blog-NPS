import { Injectable } from '@nestjs/common'
import { PrivateChatCreateDTO } from './DTO/private-chat-create.dto'
import { PrivateChatDeleteDTO } from './DTO/private-chat-delete.dto'
import { PrivateChatGetOneDTO } from './DTO/private-chat-get-one.dto'
import { PrivateChatUpdateDTO } from './DTO/private-chat-update.dto'

@Injectable()
export class PrivateChatService {
    async create(dto: PrivateChatCreateDTO) {

    }

    async getOne(dto: PrivateChatGetOneDTO) {

    }

    async update(dto: PrivateChatUpdateDTO) {

    }

    async delete(dto: PrivateChatDeleteDTO) {

    }
}
