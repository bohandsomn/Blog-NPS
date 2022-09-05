import { IsNumber } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class PhotoChatCreateDTO {
    readonly chatId: number
    readonly preview: string
}

export class PhotoChatCreateBodyDTO {
    @IsNumber({}, {message: i18nValidationMessage('validation.photo.chat.create.chat-id.is-number')})
    readonly chatId: number
}