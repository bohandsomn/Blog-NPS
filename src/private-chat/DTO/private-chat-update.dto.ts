import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class PrivateChatUpdateDTO {
    readonly id: number
    readonly userId: number
    readonly name: string
}

export class PrivateChatUpdateBodyDTO {
    @ApiProperty({example: 1})
    @IsNumber({}, {message: i18nValidationMessage('validation.private-chat.update.id.is-number')})
    readonly id: number

    @ApiProperty({example: 'Group to discuss an important issue'})
    @IsString({message: i18nValidationMessage('validation.private-chat.update.name.is-string')})
    readonly name: string
}