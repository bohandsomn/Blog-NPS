import { IsNumber } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class PhotoChatUpdateDTO {
    readonly chatId: number
    readonly preview: string
}
export class PhotoChatUpdateBodyDTO {
    @IsNumber({}, {message: i18nValidationMessage('validation.photo.chat.update.chat-id.is-number')})
    readonly chatId: number
}