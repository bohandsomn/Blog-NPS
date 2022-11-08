import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class CommentUpdateDTO {
    @ApiProperty({example: '1'})
    @IsString({message: i18nValidationMessage('validation.comment.update.content.is-string')})
    readonly commentId: string

    @ApiProperty({example: 'Write to me in Chat'})
    @IsString({message: i18nValidationMessage('validation.comment.update.post-id.is-string')})
    @IsNotEmpty({message: i18nValidationMessage('validation.comment.update.content.is-not-empty')})
    readonly content: string
}