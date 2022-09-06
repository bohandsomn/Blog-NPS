import { Body, Controller, Get, Headers, Param, Post, Redirect, Req, Res, UseGuards, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { User } from 'src/user/user.model'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { AuthorizationGuard, RequestUser } from './authorization.guard'
import { AuthorizationService } from './authorization.service'
import { LoginAuthorizationDTO } from './DTO/login-authorization.dto'
import { RegistrationAuthorizationDTO } from './DTO/registration-authorization.dto'

@ApiTags('Authorization')
@Controller('authorization')
export class AuthorizationController {
    constructor(
        private readonly authorizationService: AuthorizationService
    ) { }

    @ApiOperation({summary: 'User registration'})
    @Post('registration')
    @UsePipes(ValidationPipe)
    async registration(@Body() dto: RegistrationAuthorizationDTO, @Res({ passthrough: true }) response: Response) {
        const { user, token: { refresh, access } } = await this.authorizationService.registration(dto)
        response.cookie(process.env.COOKIE_TOKEN_NAME, refresh, { maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_MAX_AGE), httpOnly: true })
        return {
            user,
            token: access
        }
    }

    @ApiOperation({summary: 'User login'})
    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() dto: LoginAuthorizationDTO, @Res({ passthrough: true }) response: Response) {
        const { user, token: { refresh, access } } = await this.authorizationService.login(dto)
        response.cookie(process.env.COOKIE_TOKEN_NAME, refresh, { maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_MAX_AGE), httpOnly: true })
        return {
            user,
            token: access
        }
    }

    @ApiOperation({summary: 'User auto-login'})
    @Get('auto-login')
    @UseGuards(AuthorizationGuard)
    async autoLogin(@Req() request: RequestUser, @Res() response: Response) {
        const { user, token: { refresh, access } } = await this.authorizationService.autoLogin(request.user)
        response.cookie(process.env.COOKIE_TOKEN_NAME, refresh, { maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_MAX_AGE), httpOnly: true })
        return {
            user,
            token: access
        }
    }

    @ApiOperation({summary: 'Token refresh'})
    @Get('refresh')
    async refresh(@Headers() headers: Record<'authorization', string>, @Res() response: Response) {
        const { user, token: { refresh, access } } = await this.authorizationService.refresh(headers.authorization)
        response.cookie(process.env.COOKIE_TOKEN_NAME, refresh, { maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_MAX_AGE), httpOnly: true })
        return {
            user,
            token: access
        }
    }

    @ApiOperation({summary: 'User logout'})
    @Get('logout')
    logout(@Headers() headers: Record<'authorization', string>, @Res() response: Response) {
        this.authorizationService.logout(headers.authorization)
        response.clearCookie(process.env.COOKIE_TOKEN_NAME)
    }

    @ApiOperation({summary: 'User activation'})
    @Get('activation/:userId')
    @Redirect(process.env.CLIENT_URL)
    activation(@Param('userId') userId: string) {
        return this.authorizationService.activation(userId)
    }
}
