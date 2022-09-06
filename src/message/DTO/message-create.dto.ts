import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class MessageCreateDTO {
    @ApiProperty({example: 1})
    @IsNumber({}, {message: i18nValidationMessage('validation.message.create.user-id.is-number')})
    readonly userId: number

    @ApiProperty({example: 1})
    @IsNumber({}, {message: i18nValidationMessage('validation.message.create.chat-id.is-number')})
    readonly chatId: number

    @ApiProperty({example: 'There is an important issue'})
    @IsString({message: i18nValidationMessage('validation.message.create.content.is-string')})
    readonly content: string
}