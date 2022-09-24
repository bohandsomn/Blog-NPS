import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { Chat } from './chat.model'
import { ChatService } from './chat.service'
import { ChatCreateDTO } from './DTO/chat-create.dto'
import { ChatUpdateDTO } from './DTO/chat-update.dto'

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }
    
    @ApiOperation({summary: 'Chat creation'})
    @ApiResponse({status: 200, type: Chat})
    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthorizationGuard)
    create(@Req() request: RequestUser, @Body() dto: ChatCreateDTO) {
        return this.chatService.create({...dto, userId: request.user.id})
    }

    @ApiOperation({summary: 'Receiving a chat'})
    @ApiResponse({status: 200, type: Chat})
    @Get('/:chatId')
    @UseGuards(AuthorizationGuard)
    getOne(@Param('chatId') id: string) {
        return this.chatService.getOne(parseInt(id))
    }

    @Get('/user-id/:userId')
    @UseGuards(AuthorizationGuard)
    getOneByUserId(@Param('userId') userId: string) {
        return this.chatService.getOne(parseInt(userId))
    }

    @ApiOperation({summary: 'Receiving a chats'})
    @ApiResponse({status: 200, type: [Chat]})
    @Get()
    @UseGuards(AuthorizationGuard)
    getMany(@Req() request: RequestUser) {
        return this.chatService.getMany(request.user.id)
    }

    @ApiOperation({summary: 'Chat update'})
    @ApiResponse({status: 200, type: Chat})
    @Put()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthorizationGuard)
    update(@Body() dto: ChatUpdateDTO) {
        return this.chatService.update(dto)
    }

    @ApiOperation({summary: 'Deleting a chat'})
    @Delete('/:chatId')
    @UseGuards(AuthorizationGuard)
    delete(@Param('chatId') id: string) {
        return this.chatService.delete(parseInt(id))
    }
}
