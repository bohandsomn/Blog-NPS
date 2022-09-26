import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class PhotoChatCreateDTO {
    @ApiProperty({example: 1})
    readonly chatId: number

    @ApiProperty({example: 'relative/file/path'})
    readonly preview: string
}

export class PhotoChatCreateBodyDTO {
    @ApiProperty({example: 1})
    @IsString({message: i18nValidationMessage('validation.photo.chat.create.chat-id.is-string')})
    readonly chatId: number
}