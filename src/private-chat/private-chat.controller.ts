import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { PrivateChatService } from './private-chat.service';

@Controller('private-chat')
export class PrivateChatController {
    constructor(
        private readonly privateChatService: PrivateChatService
    ) { }

    @Post()
    create() { }

    @Get()
    getOne() { }

    @Patch()
    update() { }

    @Delete() 
    delete() { }
}
