import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { PrivateChatCreateBodyDTO } from './DTO/private-chat-create.dto'
import { PrivateChatUpdateBodyDTO } from './DTO/private-chat-update.dto'
import { PrivateChatService } from './private-chat.service'

@Controller('private-chat')
export class PrivateChatController {
    constructor(
        private readonly privateChatService: PrivateChatService
    ) { }

    @Post()
    @UseGuards(AuthorizationGuard)
    create(@Req() request: RequestUser, @Body() dto: PrivateChatCreateBodyDTO) {
        return this.privateChatService.create({...dto, userId: request.user.id})
    }

    @Get('/:id')
    @UseGuards(AuthorizationGuard)
    getOne(@Req() request: RequestUser, @Param('id') id: string) {
        return this.privateChatService.getOne({id: parseInt(id), userId: request.user.id})
    }

    @Patch()
    @UseGuards(AuthorizationGuard)
    update(@Req() request: RequestUser, @Body() dto: PrivateChatUpdateBodyDTO) {
        return this.privateChatService.update({...dto, userId: request.user.id})
    }

    @Delete('/:id') 
    @UseGuards(AuthorizationGuard)
    delete(@Req() request: RequestUser, @Param('id') id: string) {
        return this.privateChatService.delete({id: parseInt(id), userId: request.user.id})
    }
}
