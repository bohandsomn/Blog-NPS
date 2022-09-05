import { IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class ChatCreateDTO {
    @IsString({message: i18nValidationMessage('validation.chat.create.name.is-string')})
    readonly name: string
}