import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsLowercase } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class AuthorizationLoginDTO {
    @ApiProperty({example: 'bohdan'})
    @IsString({message: i18nValidationMessage('validation.authorization.login.login.is-string')})
    @IsLowercase({message: i18nValidationMessage('validation.authorization.login.login.is-lowercase')})
    readonly login: string

    @ApiProperty({example: '12345678'})
    @IsString({message: i18nValidationMessage('validation.authorization.login.password.is-string')})
    @Length(4, 10, {message: i18nValidationMessage('validation.authorization.login.password.lenght')})
    readonly password: string
}