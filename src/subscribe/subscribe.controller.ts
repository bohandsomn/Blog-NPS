import { Controller, Get, Param, Req, UseGuards, UseInterceptors, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { Subscribe } from './subscribe.model'
import { SubscribeService } from './subscribe.service'

@ApiTags('Subscribe')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('subscribe/:subscriberId')
export class SubscribeController {
    constructor(
        private readonly subscribeService: SubscribeService
    ) { }

    @ApiOperation({summary: 'Receiving a subscribe'})
    @ApiResponse({status: HttpStatus.OK, type: Subscribe})
    @Get('subscribe')
    @UseGuards(AuthorizationGuard)
    subscribe(@Param('subscriberId') subscriberId: string, @Req() request: RequestUser) {
        return this.subscribeService.subscribe({ userId: request.user.id, subscriberId: parseInt(subscriberId) })
    }

    @ApiOperation({summary: 'Receiving a unsubscribe'})
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    @Get('unsubscribe')
    @UseGuards(AuthorizationGuard)
    unsubscribe(@Param('subscriberId') subscriberId: string, @Req() request: RequestUser) {
        return this.subscribeService.unsubscribe({ userId: request.user.id, subscriberId: parseInt(subscriberId) })
    }

    @ApiOperation({summary: 'Receiving a unsubscribe'})
    @ApiResponse({status: HttpStatus.OK, type: Subscribe})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Get()
    @UseGuards(AuthorizationGuard)
    getSubscribe(@Param('subscriberId') subscriberId: string, @Req() request: RequestUser) {
        return this.subscribeService.getSubscribe({ userId: request.user.id, subscriberId: parseInt(subscriberId) })
    }
}
