import { Body, Controller, Get, Param, Put, Query, Req, UseGuards, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { ValidationPipe } from 'src/validation/validation.pipe'

import { UpdateUserDTO } from './DTO/update-user.dto'
import { User } from './user.model'
import { UserService } from './user.service'

@ApiTags('User')
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
    update(@Body() dto: UpdateUserDTO, @Req() request: RequestUser) {
        return this.userService.update({...dto, id: request.user.id})
    }

    @Get('/:userId')
    getOne(@Param('userId') userId: string) {
        return this.userService.getByPk(parseInt(userId))
    }
}
