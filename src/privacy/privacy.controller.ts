import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { I18nValidationExceptionFilter } from 'nestjs-i18n'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { CreatePrivacyDTO } from './DTO/create-privacy.dto'
import { Privacy } from './privacy.model'
import { PrivacyService } from './privacy.service'

@ApiTags('Privacy')
@Controller('privacy')
export class PrivacyController {
    constructor(
        private readonly privacyService: PrivacyService
    ) { }

    @ApiOperation({summary: 'Privacy creation'})
    @ApiResponse({status: 200, type: Privacy})
    @Post()
    @UseFilters(new I18nValidationExceptionFilter())
    @UsePipes(ValidationPipe)
    create(@Body() dto: CreatePrivacyDTO) {
        return this.privacyService.create(dto)
    }
}
