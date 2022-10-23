import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors, UsePipes, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { Chat } from './chat.model'
import { ChatService } from './chat.service'
import { ChatCreateDTO } from './DTO/chat-create.dto'
import { ChatUpdateDTO } from './DTO/chat-update.dto'

@ApiTags('Chat')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }
    
    @ApiOperation({summary: 'Chat creation'})
    @ApiResponse({status: HttpStatus.CREATED, type: Chat})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, type: DocumentationHttpExceptionDTO})
    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthorizationGuard)
    create(@Req() request: RequestUser, @Body() dto: ChatCreateDTO) {
        return this.chatService.create({...dto, userId: request.user.id})
    }

    @ApiOperation({summary: 'Receiving a chat'})
    @ApiResponse({status: HttpStatus.OK, type: Chat})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, type: DocumentationHttpExceptionDTO})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Get('/:chatId')
    @UseGuards(AuthorizationGuard)
    getOne(@Param('chatId') id: string) {
        return this.chatService.getOne(parseInt(id))
    }

    @ApiOperation({summary: 'Receiving a chat'})
    @ApiResponse({status: HttpStatus.OK, type: Chat})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, type: DocumentationHttpExceptionDTO})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Get('/user-id/:interlocutorId')
    @UseGuards(AuthorizationGuard)
    getOneByUserId(
        @Param('interlocutorId') interlocutorId: string,
        @Req() request: RequestUser
    ) {
        return this.chatService.getOneByUserId(parseInt(interlocutorId), request.user.id)
    }

    @ApiOperation({summary: 'Receiving a chats'})
    @ApiResponse({status: HttpStatus.OK, type: [Chat]})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, type: DocumentationHttpExceptionDTO})
    @Get()
    @UseGuards(AuthorizationGuard)
    getMany(@Req() request: RequestUser) {
        return this.chatService.getMany(request.user.id)
    }

    @ApiOperation({summary: 'Chat update'})
    @ApiResponse({status: HttpStatus.OK, type: Chat})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, type: DocumentationHttpExceptionDTO})
    @Put()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthorizationGuard)
    update(@Body() dto: ChatUpdateDTO) {
        return this.chatService.update(dto)
    }

    @ApiOperation({summary: 'Deleting a chat'})
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, type: DocumentationHttpExceptionDTO})
    @Delete('/:chatId')
    @UseGuards(AuthorizationGuard)
    delete(@Param('chatId') id: string) {
        return this.chatService.delete(parseInt(id))
    }
}
