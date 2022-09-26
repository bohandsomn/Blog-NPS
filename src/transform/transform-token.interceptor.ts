import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Response } from 'express'
import { Observable, map } from 'rxjs'
import { UserResponseDTO } from 'src/user/DTO/user-response.dto'

export type UserData = {
    user: UserResponseDTO
    token: {
        accessToken: string
        refreshToken: string
    }
}

type UserDataResponse = {
    user: UserResponseDTO
    accessToken: string
}

@Injectable()
export class TransformTokenInterceptor implements NestInterceptor<UserData> {
    intercept(context: ExecutionContext, next: CallHandler<UserData>): Observable<UserDataResponse> {
        const response: Response = (context as any).getResponse()
        return next
            .handle()
            .pipe(
                map(({user, token: {accessToken, refreshToken}}) => {
                    response.cookie(process.env.COOKIE_TOKEN_NAME, refreshToken, { maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_MAX_AGE), httpOnly: true })
                    return {
                        user,
                        accessToken
                    }
                })
            )
    }
}
