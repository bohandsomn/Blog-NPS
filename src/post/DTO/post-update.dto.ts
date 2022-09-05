import { IsString, IsDefined } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class PostUpdateDTO {
    @IsString({message: i18nValidationMessage('validation.post.update.post-id.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.update.post-id.is-defined')})
    readonly postId: string

    @IsString({message: i18nValidationMessage('validation.post.update.title.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.update.title.is-defined')})
    readonly title: string

    @IsString({message: i18nValidationMessage('validation.post.update.content.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.update.content.is-defined')})
    readonly content: string

    @IsString({message: i18nValidationMessage('validation.post.update.privacy.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.update.privacy.is-defined')})
    readonly privacy: string
}