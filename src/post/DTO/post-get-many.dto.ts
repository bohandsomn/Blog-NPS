import { IsString, IsDefined } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class PostGetManyDTO {
    @IsString({message: i18nValidationMessage('validation.post.get-many.title.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.get-many.title.is-defined')})
    readonly title: string

    @IsString({message: i18nValidationMessage('validation.post.get-many.content.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.get-many.content.is-defined')})
    readonly content: string

    @IsString({message: i18nValidationMessage('validation.post.get-many.privacy.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.get-many.privacy.is-defined')})
    readonly privacy: string

    @IsString({message: i18nValidationMessage('validation.post.get-many.page.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.get-many.page.is-defined')})
    readonly page: string
}