import { IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class CommentUpdateDTO {
    @IsString({message: i18nValidationMessage('validation.comment.update.content.is-string')})
    readonly commentId: string

    @IsString({message: i18nValidationMessage('validation.comment.update.post-id.is-string')})
    readonly content: string
}