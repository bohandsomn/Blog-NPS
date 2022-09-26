import { IsNumber } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class PrivateChatCreateDTO {
    readonly interlocutorId: number
    readonly userId: number
}

export class PrivateChatCreateBodyDTO {
    @IsNumber({}, {message: i18nValidationMessage('validation.private-chat.create.interlocutor-id.is-number')})
    readonly interlocutorId: number
}