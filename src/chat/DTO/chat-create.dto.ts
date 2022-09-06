import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class ChatCreateDTO {
    @ApiProperty({example: 'Group to discuss an important issue'})
    @IsString({message: i18nValidationMessage('validation.chat.create.name.is-string')})
    readonly name: string
}