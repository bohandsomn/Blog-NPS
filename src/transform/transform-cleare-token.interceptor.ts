import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Response } from 'express'
import { Observable, map } from 'rxjs'

@Injectable()
export class TransformCleareTokenInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
        const response: Response = (context as any).getResponse()
        return next
            .handle()
            .pipe(
                map(() => {
                    response.clearCookie(process.env.COOKIE_TOKEN_NAME)
                })
            )
    }
}
