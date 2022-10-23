import { Body, Controller, Get, Headers, Param, Post, Redirect, Req, Res, UseGuards, UseInterceptors, UsePipes, HttpException, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { TransformTokenInterceptor } from 'src/transform/transform-token.interceptor'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { AuthorizationGuard, RequestUser } from './authorization.guard'
import { AuthorizationService } from './authorization.service'
import { AuthorizationLoginDTO } from './DTO/authorization-login.dto'
import { AuthorizationRegistrationDTO } from './DTO/authorization-registration.dto'
import { AuthorizationUserDataResponseDTO } from './DTO/authorization-user-data-response.dto'

@ApiTags('Authorization')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('authorization')
export class AuthorizationController {
    constructor(
        private readonly authorizationService: AuthorizationService
    ) { }

    @ApiOperation({summary: 'User registration'})
    @ApiResponse({status: HttpStatus.OK, type: AuthorizationUserDataResponseDTO})
    @ApiResponse({status: HttpStatus.CONFLICT, type: DocumentationHttpExceptionDTO})
    @Post('registration')
    @UsePipes(ValidationPipe)
    @UseInterceptors(new TransformTokenInterceptor())
    registration(@Body() dto: AuthorizationRegistrationDTO) {
        return this.authorizationService.registration(dto)
    }

    @ApiOperation({summary: 'User login'})
    @ApiResponse({status: HttpStatus.OK, type: AuthorizationUserDataResponseDTO})
    @ApiResponse({status: HttpStatus.CONFLICT, type: DocumentationHttpExceptionDTO})
    @ApiResponse({status: HttpStatus.FORBIDDEN, type: DocumentationHttpExceptionDTO})
    @Post('login')
    @UsePipes(ValidationPipe)
    @UseInterceptors(new TransformTokenInterceptor())
    login(@Body() dto: AuthorizationLoginDTO) {
        return this.authorizationService.login(dto)
    }

    @ApiOperation({summary: 'User auto-login'})
    @ApiResponse({status: HttpStatus.OK, type: AuthorizationUserDataResponseDTO})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, type: DocumentationHttpExceptionDTO})
    @Get('auto-login')
    @UseGuards(AuthorizationGuard)
    @UseInterceptors(new TransformTokenInterceptor())
    autoLogin(@Req() request: RequestUser) {
        return this.authorizationService.autoLogin(request.user)
    }

    @ApiOperation({summary: 'Token refresh'})
    @ApiResponse({status: HttpStatus.OK, type: AuthorizationUserDataResponseDTO})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, type: DocumentationHttpExceptionDTO})
    @ApiResponse({status: HttpStatus.CONFLICT, type: DocumentationHttpExceptionDTO})
    @Get('refresh')
    @UseInterceptors(new TransformTokenInterceptor())
    refresh(@Req() request: Request) {
        return this.authorizationService.refresh(request.cookies[process.env.COOKIE_TOKEN_NAME])
    }

    @ApiOperation({summary: 'User logout'})
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    @Get('logout')
    logout(@Headers() headers: Record<'authorization', string>, @Res() response: Response) {
        this.authorizationService.logout(headers.authorization)
        response.clearCookie(process.env.COOKIE_TOKEN_NAME)
    }

    @ApiOperation({summary: 'User activation'})
    @ApiResponse({status: HttpStatus.AMBIGUOUS})
    @Get('activation/:userId')
    @Redirect(process.env.CLIENT_URL)
    activation(@Param('userId') userId: string) {
        return this.authorizationService.activation(userId)
    }
}
