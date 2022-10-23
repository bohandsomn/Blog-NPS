import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDefined, IsNotEmpty } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class PostCreateDTO {
    @ApiProperty({example: "We solved an important problem"})
    @IsString({message: i18nValidationMessage('validation.post.create.title.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.create.title.is-defined')})
    @IsNotEmpty({message: i18nValidationMessage('validation.post.create.title.is-not-empty')})
    readonly title: string

    @ApiProperty({example: "During an hour of discussion of an important problem, we found a solution"})
    @IsString({message: i18nValidationMessage('validation.post.create.content.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.create.content.is-defined')})
    @IsNotEmpty({message: i18nValidationMessage('validation.post.create.content.is-not-empty')})
    readonly content: string

    @ApiProperty({example: "PUBLIC"})
    @IsString({message: i18nValidationMessage('validation.post.create.privacy.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.create.privacy.is-defined')})
    readonly privacy: string
}