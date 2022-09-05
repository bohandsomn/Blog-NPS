import { IsString, IsDefined } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class CreatePrivacyDTO {
    @IsString({message: i18nValidationMessage('validation.privacy.create.value.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.privacy.create.value.is-defined')})
    readonly value: string
}