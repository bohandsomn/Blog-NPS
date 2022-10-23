import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { SubscribeSubscribeDTO } from './DTO/subscribe.subscribe.dto'
import { SubscribeUnsubscribeDTO } from './DTO/subscribe.unsubscribe.dto'
import { Subscribe } from './subscribe.model'

@Injectable()
export class SubscribeService {
    constructor(
        @InjectModel(Subscribe) private readonly subscribeRepository: typeof Subscribe
    ) { }

    async subscribe(dto: SubscribeSubscribeDTO) {
        return this.subscribeRepository.create({userId: dto.userId, subscriberId: dto.subscriberId})
    }

    async unsubscribe(dto: SubscribeUnsubscribeDTO) {
        return this.subscribeRepository.destroy({where: {userId: dto.userId, subscriberId: dto.subscriberId}})
    }

    async getSubscribers(userId: string) {
        const subscribers = await this.subscribeRepository.findAll({include: {all: true}, where: {userId}})
        return subscribers
    }

    async getSubscriptions(userId: string) {
        const subscriptions = await this.subscribeRepository.findAll({include: {all: true}, where: {subscriberId: userId}})
        return subscriptions
    }
}
