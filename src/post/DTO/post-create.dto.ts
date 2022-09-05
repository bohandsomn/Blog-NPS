import { IsString, IsDefined } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class PostCreateDTO {
    @IsString({message: i18nValidationMessage('validation.post.create.title.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.create.title.is-defined')})
    readonly title: string

    @IsString({message: i18nValidationMessage('validation.post.create.content.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.create.content.is-defined')})
    readonly content: string

    @IsString({message: i18nValidationMessage('validation.post.create.privacy.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.create.privacy.is-defined')})
    readonly privacy: string
}