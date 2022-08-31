import { Body, Controller, Get, Headers, Param, Post, Redirect, Req, Res, UseGuards } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { AuthorizationGuard, RequestUser } from './authorization.guard'
import { AuthorizationService } from './authorization.service'
import { LoginAuthorizationDTO } from './DTO/login-authorization.dto'
import { RegistrationAuthorizationDTO } from './DTO/registration-authorization.dto'

@Controller('authorization')
export class AuthorizationController {
    constructor(
        private readonly authorizationService: AuthorizationService
    ) { }

    @Post('registration')
    async registration(@Body() dto: RegistrationAuthorizationDTO, @Res({ passthrough: true }) response: FastifyReply) {
        const { user, token: { refresh, access } } = await this.authorizationService.registration(dto)
        response.setCookie(process.env.COOKIE_TOKEN_NAME, refresh, { maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_MAX_AGE), httpOnly: true })
        return {
            user,
            token: access
        }
    }

    @Post('login')
    async login(@Body() dto: LoginAuthorizationDTO, @Res({ passthrough: true }) response: FastifyReply) {
        const { user, token: { refresh, access } } = await this.authorizationService.login(dto)
        response.setCookie(process.env.COOKIE_TOKEN_NAME, refresh, { maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_MAX_AGE), httpOnly: true })
        return {
            user,
            token: access
        }
    }

    @Get('auto-login')
    @UseGuards(AuthorizationGuard)
    async autoLogin(@Req() request: RequestUser, @Res() response: FastifyReply) {
        const { user, token: { refresh, access } } = await this.authorizationService.autoLogin(request.user)
        response.setCookie(process.env.COOKIE_TOKEN_NAME, refresh, { maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_MAX_AGE), httpOnly: true })
        return {
            user,
            token: access
        }
    }

    @Get('refresh')
    async refresh(@Headers() headers: Record<'authorization', string>, @Res() response: FastifyReply) {
        const { user, token: { refresh, access } } = await this.authorizationService.refresh(headers.authorization)
        response.setCookie(process.env.COOKIE_TOKEN_NAME, refresh, { maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_MAX_AGE), httpOnly: true })
        return {
            user,
            token: access
        }
    }

    @Get('logout')
    logout(@Headers() headers: Record<'authorization', string>, @Res() response: FastifyReply) {
        this.authorizationService.logout(headers.authorization)
        response.clearCookie(process.env.COOKIE_TOKEN_NAME)
    }

    @Get('activation/:userId')
    @Redirect(process.env.CLIENT_URL)
    activation(@Param('userId') userId: string) {
        return this.authorizationService.activation(userId)
    }
}
