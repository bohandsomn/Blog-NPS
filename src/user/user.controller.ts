import { Body, Controller, Get, Param, Put, Query, Req, Res, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { AuthorizationUserDataResponseDTO } from 'src/authorization/DTO/authorization-user-data-response.dto'
import { TransformInterceptor } from 'src/transform/transform.interceptor'
import { ValidationPipe } from 'src/validation/validation.pipe'

import { UpdateUserDTO } from './DTO/update-user.dto'
import { User } from './user.model'
import { UserService } from './user.service'

@ApiTags('User')
@UseInterceptors(TransformInterceptor)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    // @ApiOperation({summary: 'Receiving a users preview'})
    // @ApiResponse({status: 200, type: [User]})
    // @Get('/preview')
    // getPreview(@Query('fullname') fullname: string) {
    //     return this.userService.getPreview(fullname)
    // }

    @ApiOperation({summary: 'User update'})
    @ApiResponse({status: 200, type: User})
    @Put()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    async update(@Body() dto: UpdateUserDTO, @Req() request: RequestUser, @Res() response: Response): Promise<AuthorizationUserDataResponseDTO> {
        const { user, token: { refreshToken, accessToken } } = await this.userService.update({...dto, id: request.user.id})
        response.cookie(process.env.COOKIE_TOKEN_NAME, refreshToken, { maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_MAX_AGE), httpOnly: true })
        return {
            user,
            accessToken
        }
    }

    @Get('/:userId')
    getOne(@Param('userId') userId: string) {
        return this.userService.getByPk(parseInt(userId))
    }
}
