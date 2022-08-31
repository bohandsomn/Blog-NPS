import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { I18nService } from 'nestjs-i18n'
import { Activation } from './activation.model'

@Injectable()
export class ActivationService {
    constructor(
        @InjectModel(Activation) private readonly activationRepository: typeof Activation,
        private readonly i18nService: I18nService,
    ) { }

    async create(userId: number) {
        const activation = await this.activationRepository.create({userId})
        return activation
    }

    async activate(userId: number) {
        const activation = await this.activationRepository.findOne({where: {userId}})
        if (!activation) {
            throw new HttpException(this.i18nService.t<string>("exception.activation.activate.not-found"), HttpStatus.NOT_FOUND)
        }

        activation.value = !activation.value
        await activation.save()
        return activation
    }
    
    async getById(userId: number) {
        const activation = await this.activationRepository.findOne({where: {userId}})
        if (!activation) {
            throw new HttpException(this.i18nService.t<string>("exception.activation.get-by-id.not-found"), HttpStatus.NOT_FOUND)
        }
        return activation
    }
}
