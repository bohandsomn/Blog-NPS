import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class PrivateChatCreateDTO {
    readonly interlocutorId: number
    readonly userId: number
}

export class PrivateChatCreateBodyDTO {
    @ApiProperty({example: 'Group to discuss an important issue'})
    @IsNumber({}, {message: i18nValidationMessage('validation.private-chat.create.interlocutor-id.is-number')})
    readonly interlocutorId: number
}