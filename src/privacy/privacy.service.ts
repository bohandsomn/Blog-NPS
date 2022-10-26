import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { I18nService } from 'nestjs-i18n'
import { CreatePrivacyDTO } from './DTO/create-privacy.dto'
import { Privacy } from './privacy.model'

@Injectable()
export class PrivacyService {
    constructor(
        @InjectModel(Privacy) private readonly privacyRepository: typeof Privacy,
        private readonly i18nService: I18nService
    ) { }

    async create(dto: CreatePrivacyDTO) {
        await this.verify(dto.value)
        const privacy = await this.privacyRepository.create(dto)
        return privacy
    }

    async getMany() {
        const allPrivacy = await this.privacyRepository.findAll()
        return allPrivacy
    }

    async getByValue(value: string) {
        await this.verify(value, true)
        const privacy = await this.privacyRepository.findOne({where: {value}})
        return privacy
    }

    async verify(value: string, mustHave = false) {
        const hasPrivacy = !!await this.privacyRepository.findOne({where: {value}})
        
        if (mustHave && !hasPrivacy) {
            throw new HttpException(this.i18nService.t<string>('exception.privacy.verify.not-found'), HttpStatus.NOT_FOUND)
        }

        if (!mustHave && hasPrivacy) {
            throw new HttpException(this.i18nService.t<string>('exception.privacy.verify.has-value'), HttpStatus.CONFLICT)
        }
    }
}
