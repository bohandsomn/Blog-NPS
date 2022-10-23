import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { Chat } from 'src/chat/chat.model'
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
    @ApiResponse({status: 200, type: Chat})
    @Post()
    @UseGuards(AuthorizationGuard)
    create(@Req() request: RequestUser, @Body() dto: PrivateChatCreateBodyDTO) {
        return this.privateChatService.create({...dto, userId: request.user.id})
    }

    @ApiOperation({summary: 'Receiving a chat'})
    @ApiResponse({status: 200, type: Chat})
    @Get('/:id')
    @UseGuards(AuthorizationGuard)
    getOne(@Req() request: RequestUser, @Param('id') id: string) {
        return this.privateChatService.getOne({id: parseInt(id), userId: request.user.id})
    }

    @ApiOperation({summary: 'Chat update'})
    @ApiResponse({status: 200, type: Chat})
    @Patch()
    @UseGuards(AuthorizationGuard)
    update(@Req() request: RequestUser, @Body() dto: PrivateChatUpdateBodyDTO) {
        return this.privateChatService.update({...dto, userId: request.user.id})
    }

    @ApiOperation({summary: 'Deleting a chat'})
    @Delete('/:id') 
    @UseGuards(AuthorizationGuard)
    delete(@Req() request: RequestUser, @Param('id') id: string) {
        return this.privateChatService.delete({id: parseInt(id), userId: request.user.id})
    }
}
