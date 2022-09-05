import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common'
import { I18nValidationExceptionFilter } from 'nestjs-i18n'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { CreatePrivacyDTO } from './DTO/create-privacy.dto'
import { PrivacyService } from './privacy.service'

@Controller('privacy')
export class PrivacyController {
    constructor(
        private readonly privacyService: PrivacyService
    ) { }

    @Post()
    @UseFilters(new I18nValidationExceptionFilter())
    @UsePipes(ValidationPipe)
    create(@Body() dto: CreatePrivacyDTO) {
        return this.privacyService.create(dto)
    }
}
