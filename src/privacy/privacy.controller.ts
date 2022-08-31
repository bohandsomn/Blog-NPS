import { Body, Controller, Post } from '@nestjs/common'
import { CreatePrivacyDTO } from './DTO/create-privacy.dto'
import { PrivacyService } from './privacy.service'

@Controller('privacy')
export class PrivacyController {
    constructor(
        private readonly privacyService: PrivacyService
    ) { }

    @Post()
    create(@Body() dto: CreatePrivacyDTO) {
        return this.privacyService.create(dto)
    }
}
