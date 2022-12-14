import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDefined } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class PostGetManyDTO {
    @ApiProperty({example: "We solved an important problem"})
    @IsString({message: i18nValidationMessage('validation.post.get-many.title.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.get-many.title.is-defined')})
    readonly title: string

    @ApiProperty({example: "During an hour of discussion of an important problem, we found a solution"})
    @IsString({message: i18nValidationMessage('validation.post.get-many.content.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.get-many.content.is-defined')})
    readonly content: string

    @ApiProperty({example: "PUBLIC"})
    @IsString({message: i18nValidationMessage('validation.post.get-many.privacy.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.get-many.privacy.is-defined')})
    readonly privacy: string

    @ApiProperty({example: "1"})
    @IsString({message: i18nValidationMessage('validation.post.get-many.page.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.get-many.page.is-defined')})
    readonly page: string
}