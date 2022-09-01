import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard';
import { SubscribeService } from './subscribe.service';

@Controller('subscribe/:subscriberId')
export class SubscribeController {
    constructor(
        private readonly subscribeService: SubscribeService
    ) { }

    @Get('subscribe')
    @UseGuards(AuthorizationGuard)
    subscribe(@Param('subscriberId') subscriberId: string, @Req() request: RequestUser) {
        return this.subscribeService.subscribe({ userId: request.user.id, subscriberId: parseInt(subscriberId) })
    }

    @Get('unsubscribe')
    @UseGuards(AuthorizationGuard)
    unsubscribe(@Param('subscriberId') subscriberId: string, @Req() request: RequestUser) {
        return this.subscribeService.unsubscribe({ userId: request.user.id, subscriberId: parseInt(subscriberId) })
    }
}
