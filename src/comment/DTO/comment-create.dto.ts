import { IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class CommentCreateDTO {
    @IsString({message: i18nValidationMessage('validation.comment.create.content.is-string')})
    readonly content: string

    @IsString({message: i18nValidationMessage('validation.comment.create.post-id.is-string')})
    readonly postId: string
}