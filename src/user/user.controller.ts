import { Body, Controller, Get, Put, Query, Req, UseGuards, UsePipes } from '@nestjs/common'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { ValidationPipe } from 'src/validation/validation.pipe'

import { UpdateUserDTO } from './DTO/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/preview')
    getPreview(@Query('fullname') fullname: string) {
        return this.userService.getPreview(fullname)
    }

    @Put()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    update(@Body() dto: UpdateUserDTO, @Req() request: RequestUser) {
        return this.userService.update({...dto, id: request.user.id})
    }
}
