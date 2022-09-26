import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { getI18nContextFromRequest } from 'nestjs-i18n'
import { User } from 'src/user/user.model'
import { TokenService } from 'src/token/token.service'

export type RequestUser = Request & {
    user: User
}

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private readonly tokenService: TokenService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        const i18n = getI18nContextFromRequest(request)

        try {
            const authorization = request.headers.authorization
            if (!authorization) {
                throw new UnauthorizedException({message: i18n.t("exception.guard.authorization.unauthorized")})
            }
            const token = this.tokenService.split(authorization)
            const user = await this.tokenService.verify(token, 'ACCESS')
            if (!user) {
                throw new UnauthorizedException({message: i18n.t("exception.guard.authorization.unauthorized")})
            }

            (request as any).user = user

            return true
        } catch (error) {
            throw new UnauthorizedException({message: i18n.t("exception.guard.authorization.unauthorized")})
        }
    }
}
