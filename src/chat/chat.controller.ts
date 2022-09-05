import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { ChatService } from './chat.service'
import { ChatCreateDTO } from './DTO/chat-create.dto'
import { ChatUpdateDTO } from './DTO/chat-update.dto'

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }
    
    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthorizationGuard)
    create(@Req() request: RequestUser, @Body() dto: ChatCreateDTO) {
        return this.chatService.create({...dto, userId: request.user.id})
    }

    @Get('/:chatId')
    @UseGuards(AuthorizationGuard)
    getOne(@Param('chatId') id: string) {
        return this.chatService.getOne(parseInt(id))
    }

    @Get()
    @UseGuards(AuthorizationGuard)
    getMany(@Req() request: RequestUser) {
        return this.chatService.getMany(request.user.id)
    }

    @Put()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthorizationGuard)
    update(@Body() dto: ChatUpdateDTO) {
        return this.chatService.update(dto)
    }

    @Delete('/:chatId')
    @UseGuards(AuthorizationGuard)
    delete(@Param('chatId') id: string) {
        return this.chatService.delete(parseInt(id))
    }
}
