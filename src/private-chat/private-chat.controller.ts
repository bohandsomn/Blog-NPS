import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { Chat } from 'src/chat/chat.model'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { PrivateChatCreateBodyDTO } from './DTO/private-chat-create.dto'
import { PrivateChatUpdateBodyDTO } from './DTO/private-chat-update.dto'
import { PrivateChatService } from './private-chat.service'

@ApiTags('Private chat')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('private-chat')
export class PrivateChatController {
    constructor(
        private readonly privateChatService: PrivateChatService
    ) { }

    @ApiOperation({summary: 'Chat creation'})
    @ApiResponse({status: HttpStatus.OK, type: Chat})
    @Post()
    @UseGuards(AuthorizationGuard)
    create(@Req() request: RequestUser, @Body() dto: PrivateChatCreateBodyDTO) {
        return this.privateChatService.create({...dto, userId: request.user.id})
    }

    @ApiOperation({summary: 'Receiving a chat'})
    @ApiResponse({status: HttpStatus.OK, type: Chat})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @ApiResponse({status: HttpStatus.FORBIDDEN, type: DocumentationHttpExceptionDTO})
    @Get('/:interlocutorId/:userId')
    getOne(@Param('interlocutorId') interlocutorId: string, @Param('userId') userId: string) {
        return this.privateChatService.getOne({
            interlocutorId: parseInt(interlocutorId), 
            userId: parseInt(userId)
        })
    }

    @ApiOperation({summary: 'Chat update'})
    @ApiResponse({status: HttpStatus.OK, type: Chat})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @ApiResponse({status: HttpStatus.FORBIDDEN, type: DocumentationHttpExceptionDTO})
    @Patch()
    @UseGuards(AuthorizationGuard)
    update(@Req() request: RequestUser, @Body() dto: PrivateChatUpdateBodyDTO) {
        return this.privateChatService.update({...dto, userId: request.user.id})
    }

    @ApiOperation({summary: 'Deleting a chat'})
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @ApiResponse({status: HttpStatus.FORBIDDEN, type: DocumentationHttpExceptionDTO})
    @Delete('/:id') 
    @UseGuards(AuthorizationGuard)
    delete(@Req() request: RequestUser, @Param('id') id: string) {
        return this.privateChatService.delete({id: parseInt(id), userId: request.user.id})
    }
}
