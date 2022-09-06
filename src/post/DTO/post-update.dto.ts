import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDefined } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class PostUpdateDTO {
    @ApiProperty({example: "1"})
    @IsString({message: i18nValidationMessage('validation.post.update.post-id.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.update.post-id.is-defined')})
    readonly postId: string

    @ApiProperty({example: "We solved an important problem"})
    @IsString({message: i18nValidationMessage('validation.post.update.title.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.update.title.is-defined')})
    readonly title: string

    @ApiProperty({example: "During an hour of discussion of an important problem, we found a solution"})
    @IsString({message: i18nValidationMessage('validation.post.update.content.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.update.content.is-defined')})
    readonly content: string

    @ApiProperty({example: "PUBLIC"})
    @IsString({message: i18nValidationMessage('validation.post.update.privacy.is-string')})
    @IsDefined({message: i18nValidationMessage('validation.post.update.privacy.is-defined')})
    readonly privacy: string
}