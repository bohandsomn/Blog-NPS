import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthorizationGuard } from 'src/authorization/authorization.guard'
import { UserChatRoleCreateDTO } from './DTO/user-chat-role-create.dto'
import { UserChatRoleService } from './user-chat-role.service'

@Controller('user-chat-role')
export class UserChatRoleController {
    constructor(
        private readonly userChatRoleService: UserChatRoleService
    ) { }

    @Post()
    @UseGuards(AuthorizationGuard)
    create(@Body() dto: UserChatRoleCreateDTO) {
        return this.userChatRoleService.create(dto)
    }

    @Get('/:value')
    @UseGuards(AuthorizationGuard)
    getByValue(@Param('value') value: string) {
        return this.userChatRoleService.getByValue(value)
    }
}
