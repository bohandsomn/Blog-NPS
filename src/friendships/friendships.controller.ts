import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthorizationGuard } from 'src/authorization/authorization.guard'
import { FriendshipsService } from './friendships.service'

@Controller('friendships/:userId')
export class FriendshipsController {
    constructor(
        private readonly friendshipsService: FriendshipsService
    ) { }

    @Get('/subscribers')
    @UseGuards(AuthorizationGuard)
    getSubscribers(@Param('userId') userId: string) {
        return this.friendshipsService.getSubscribers(userId)
    }

    @Get('/subscriptions')
    @UseGuards(AuthorizationGuard)
    getSubscriptions(@Param('userId') userId: string) {
        return this.friendshipsService.getSubscriptions(userId)
    }

}
