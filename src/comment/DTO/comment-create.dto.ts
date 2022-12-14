import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class CommentCreateDTO {
    @ApiProperty({example: 'Write to me in Chat'})
    @IsString({message: i18nValidationMessage('validation.comment.create.content.is-string')})
    @IsNotEmpty({message: i18nValidationMessage('validation.comment.create.content.is-not-empty')})
    readonly content: string

    @ApiProperty({example: '1'})
    @IsString({message: i18nValidationMessage('validation.comment.create.post-id.is-string')})
    readonly postId: string
}