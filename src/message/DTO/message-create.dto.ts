import { IsNumber, IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class MessageCreateDTO {
    @IsNumber({}, {message: i18nValidationMessage('validation.message.create.user-id.is-number')})
    readonly userId: number

    @IsNumber({}, {message: i18nValidationMessage('validation.message.create.chat-id.is-number')})
    readonly chatId: number

    @IsString({message: i18nValidationMessage('validation.message.create.content.is-string')})
    readonly content: string
}