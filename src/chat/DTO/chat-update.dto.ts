import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class ChatUpdateDTO {
    @ApiProperty({example: 1})
    @IsNumber({}, {message: i18nValidationMessage('validation.chat.update.id.is-number')})
    readonly id: number

    @ApiProperty({example: 'Group to discuss an important issue'})
    @IsString({message: i18nValidationMessage('validation.chat.update.name.is-string')})
    readonly name: string

    @ApiProperty({example: 'PRIVATE'})
    @IsString({message: i18nValidationMessage('validation.chat.update.privacy.is-string')})
    readonly privacy: string
}