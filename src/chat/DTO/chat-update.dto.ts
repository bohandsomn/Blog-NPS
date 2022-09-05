import { IsString, IsNumber } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class ChatUpdateDTO {
    @IsNumber({}, {message: i18nValidationMessage('validation.chat.update.id.is-number')})
    readonly id: number

    @IsString({message: i18nValidationMessage('validation.chat.update.name.is-string')})
    readonly name: string

    @IsString({message: i18nValidationMessage('validation.chat.update.privacy.is-string')})
    readonly privacy: string
}