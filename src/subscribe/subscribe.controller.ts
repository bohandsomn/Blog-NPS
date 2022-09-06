import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard';
import { Subscribe } from './subscribe.model';
import { SubscribeService } from './subscribe.service';

@ApiTags('Subscribe')
@Controller('subscribe/:subscriberId')
export class SubscribeController {
    constructor(
        private readonly subscribeService: SubscribeService
    ) { }

    @ApiOperation({summary: 'Receiving a subscribe'})
    @ApiResponse({status: 200, type: Subscribe})
    @Get('subscribe')
    @UseGuards(AuthorizationGuard)
    subscribe(@Param('subscriberId') subscriberId: string, @Req() request: RequestUser) {
        return this.subscribeService.subscribe({ userId: request.user.id, subscriberId: parseInt(subscriberId) })
    }

    @ApiOperation({summary: 'Receiving a unsubscribe'})
    @Get('unsubscribe')
    @UseGuards(AuthorizationGuard)
    unsubscribe(@Param('subscriberId') subscriberId: string, @Req() request: RequestUser) {
        return this.subscribeService.unsubscribe({ userId: request.user.id, subscriberId: parseInt(subscriberId) })
    }
}
