import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { I18nService } from 'nestjs-i18n'
import { SubscribeGetSubscribeDTO } from './DTO/subscribe.get-subscribe.dto'
import { SubscribeSubscribeDTO } from './DTO/subscribe.subscribe.dto'
import { SubscribeUnsubscribeDTO } from './DTO/subscribe.unsubscribe.dto'
import { Subscribe } from './subscribe.model'

@Injectable()
export class SubscribeService {
    constructor(
        @InjectModel(Subscribe) private readonly subscribeRepository: typeof Subscribe,
        private readonly i18nService: I18nService
    ) { }

    async subscribe(dto: SubscribeSubscribeDTO) {
        return this.subscribeRepository.create({userId: dto.userId, subscriberId: dto.subscriberId})
    }

    async unsubscribe(dto: SubscribeUnsubscribeDTO) {
        return this.subscribeRepository.destroy({where: {userId: dto.userId, subscriberId: dto.subscriberId}})
    }

    async getSubscribe(dto: SubscribeGetSubscribeDTO) {
        const subscribe = await this.subscribeRepository.findOne({where: {userId: dto.userId, subscriberId: dto.subscriberId}})
        if (subscribe === null) {
            throw new HttpException(this.i18nService.t<string>("exception.subscribe.get-subscribe.not-found"), HttpStatus.NOT_FOUND)
        }

        return subscribe
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
