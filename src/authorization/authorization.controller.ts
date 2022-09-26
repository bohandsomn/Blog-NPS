import { Body, Controller, Get, Headers, Param, Post, Redirect, Req, Res, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { TransformTokenInterceptor } from 'src/transform/transform-token.interceptor'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { AuthorizationGuard, RequestUser } from './authorization.guard'
import { AuthorizationService } from './authorization.service'
import { AuthorizationLoginDTO } from './DTO/authorization-login.dto'
import { AuthorizationRegistrationDTO } from './DTO/authorization-registration.dto'

@ApiTags('Authorization')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('authorization')
export class AuthorizationController {
    constructor(
        private readonly authorizationService: AuthorizationService
    ) { }

    @ApiOperation({summary: 'User registration'})
    @Post('registration')
    @UsePipes(ValidationPipe)
    @UseInterceptors(new TransformTokenInterceptor())
    registration(@Body() dto: AuthorizationRegistrationDTO) {
        return this.authorizationService.registration(dto)
    }

    @ApiOperation({summary: 'User login'})
    @Post('login')
    @UsePipes(ValidationPipe)
    @UseInterceptors(new TransformTokenInterceptor())
    login(@Body() dto: AuthorizationLoginDTO) {
        return this.authorizationService.login(dto)
    }

    @ApiOperation({summary: 'User auto-login'})
    @Get('auto-login')
    @UseGuards(AuthorizationGuard)
    @UseInterceptors(new TransformTokenInterceptor())
    autoLogin(@Req() request: RequestUser) {
        return this.authorizationService.autoLogin(request.user)
    }

    @ApiOperation({summary: 'Token refresh'})
    @Get('refresh')
    @UseInterceptors(new TransformTokenInterceptor())
    refresh(@Headers() headers: Record<'authorization', string>) {
        return this.authorizationService.refresh(headers.authorization)
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
