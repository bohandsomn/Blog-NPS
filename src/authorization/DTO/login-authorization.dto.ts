import { IsString, Length, IsLowercase } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class LoginAuthorizationDTO {
    @IsString({message: i18nValidationMessage('validation.authorization.login.login.is-string')})
    @IsLowercase({message: i18nValidationMessage('validation.authorization.login.login.is-lowercase')})
    readonly login: string

    @IsString({message: i18nValidationMessage('validation.authorization.login.password.is-string')})
    @Length(4, 10, {message: i18nValidationMessage('validation.authorization.login.password.lenght')})
    readonly password: string
}