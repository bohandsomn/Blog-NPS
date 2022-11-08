import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class MessageGetManyDTO {
    @ApiProperty({example: 1})
    @IsNumber({}, {message: i18nValidationMessage('validation.message.get-many.user-id.is-number')})
    readonly userId: number

    @ApiProperty({example: 1})
    @IsNumber({}, {message: i18nValidationMessage('validation.message.get-many.chat-id.is-number')})
    readonly chatId: number

    @ApiProperty({example: 'There is an important issue'})
    @IsNumber({}, {message: i18nValidationMessage('validation.message.get-many.page.is-number')})
    readonly page: number
}