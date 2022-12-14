import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, UseInterceptors, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard } from 'src/authorization/authorization.guard'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { UserChatRoleCreateDTO } from './DTO/user-chat-role-create.dto'
import { UserChatRole } from './user-chat-role.model'
import { UserChatRoleService } from './user-chat-role.service'

@ApiTags('User chat role')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('user-chat-role')
export class UserChatRoleController {
    constructor(
        private readonly userChatRoleService: UserChatRoleService
    ) { }

    @ApiOperation({summary: 'User chat role creation'})
    @ApiResponse({status: HttpStatus.OK, type: UserChatRole})
    @ApiResponse({status: HttpStatus.CONFLICT, type: DocumentationHttpExceptionDTO})
    @Post()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    create(@Body() dto: UserChatRoleCreateDTO) {
        return this.userChatRoleService.create(dto)
    }

    @ApiOperation({summary: 'Receiving a user chat role'})
    @ApiResponse({status: HttpStatus.OK, type: UserChatRole})
    @Get('/:value')
    @UseGuards(AuthorizationGuard)
    getByValue(@Param('value') value: string) {
        return this.userChatRoleService.getByValue(value)
    }
}
