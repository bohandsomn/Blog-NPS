import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard } from 'src/authorization/authorization.guard'
import { Subscribe } from 'src/subscribe/subscribe.model'
import { FriendshipsService } from './friendships.service'

@ApiTags('Friendships')
@Controller('friendships/:userId')
export class FriendshipsController {
    constructor(
        private readonly friendshipsService: FriendshipsService
    ) { }

    @ApiOperation({summary: 'Getting subscribers'})
    @ApiResponse({status: 200, type: [Subscribe]})
    @Get('/subscribers')
    @UseGuards(AuthorizationGuard)
    getSubscribers(@Param('userId') userId: string) {
        return this.friendshipsService.getSubscribers(userId)
    }

    @ApiOperation({summary: 'Getting subscriptions'})
    @ApiResponse({status: 200, type: [Subscribe]})
    @Get('/subscriptions')
    @UseGuards(AuthorizationGuard)
    getSubscriptions(@Param('userId') userId: string) {
        return this.friendshipsService.getSubscriptions(userId)
    }

}
