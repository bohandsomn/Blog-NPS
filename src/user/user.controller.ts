import { Body, Controller, Get, Param, Put, Req, Res, UseGuards, UseInterceptors, UsePipes, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { AuthorizationUserDataResponseDTO } from 'src/authorization/DTO/authorization-user-data-response.dto'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { TransformTokenInterceptor } from 'src/transform/transform-token.interceptor'
import { ValidationPipe } from 'src/validation/validation.pipe'

import { UpdateUserDTO } from './DTO/update-user.dto'
import { UserResponseDTO } from './DTO/user-response.dto'
import { UserService } from './user.service'

@ApiTags('User')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({summary: 'User update'})
    @ApiResponse({status: HttpStatus.OK, type: AuthorizationUserDataResponseDTO})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @ApiResponse({status: HttpStatus.CONFLICT, type: DocumentationHttpExceptionDTO})
    @Put()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(new TransformTokenInterceptor())
    update(@Body() dto: UpdateUserDTO, @Req() request: RequestUser) {
        return this.userService.update({...dto, id: request.user.id})
    }

    @ApiOperation({summary: 'User receive'})
    @ApiResponse({status: HttpStatus.OK, type: UserResponseDTO})
    @ApiResponse({status: HttpStatus.CONFLICT, type: DocumentationHttpExceptionDTO})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Get('/:userId')
    getOne(@Param('userId') userId: string) {
        return this.userService.getOne(parseInt(userId))
    }
}
