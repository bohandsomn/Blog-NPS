import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class MessageConnectDTO {
    @ApiProperty({example: 1})
    @IsNumber({}, {message: i18nValidationMessage('validation.message.connect.chat-id.is-number')})
    readonly chatId: number
}