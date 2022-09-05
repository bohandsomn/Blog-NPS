import { IsNumber } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class MessageConnectDTO {
    @IsNumber({}, {message: i18nValidationMessage('validation.message.connect.chat-id.is-number')})
    readonly chatId: number
}