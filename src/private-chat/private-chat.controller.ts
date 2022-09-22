import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common'
import { AuthorizationGuard } from 'src/authorization/authorization.guard'
import { PrivateChatService } from './private-chat.service'

@Controller('private-chat')
export class PrivateChatController {
    constructor(
        private readonly privateChatService: PrivateChatService
    ) { }

    @Post()
    @UseGuards(AuthorizationGuard)
    create() { }

    @Get()
    @UseGuards(AuthorizationGuard)
    getOne() { }

    @Patch()
    @UseGuards(AuthorizationGuard)
    update() { }

    @Delete() 
    @UseGuards(AuthorizationGuard)
    delete() { }
}
