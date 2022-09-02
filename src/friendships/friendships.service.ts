import { Injectable } from '@nestjs/common'
import { SubscribeService } from 'src/subscribe/subscribe.service'

@Injectable()
export class FriendshipsService {
    constructor(
        private readonly subscribeService: SubscribeService
    ) { }

    async getSubscribers(userId: string) {
        const subscribers = await this.subscribeService.getSubscribers(userId)
        return subscribers
    }

    async getSubscriptions(userId: string) {
        const subscriptions = await this.subscribeService.getSubscriptions(userId)
        return subscriptions
    }
}
