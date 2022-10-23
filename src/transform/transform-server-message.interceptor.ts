import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { IncomingMessage } from 'http'
import { I18nService } from 'nestjs-i18n'
import { map, Observable } from 'rxjs'
import { TransformServerMessageDTO } from './DTO/transform-server-message.dto'

@Injectable()
export class TransformServerMessageInterceptor<T> implements NestInterceptor<T, TransformServerMessageDTO<T>> {
    constructor(
        private readonly i18nService: I18nService
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<TransformServerMessageDTO<T>> {
        const incomingMessage: IncomingMessage = context.getArgByIndex(0)
        const method = incomingMessage.method
        const path = (incomingMessage as any).route.path
        return next
            .handle()
            .pipe(
                map(data => ({ data, message: this.i18nService.t(`server-message.${path}.${method}`) }))
            )
    }
}
