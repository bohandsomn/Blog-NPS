import { IsString, IsEmail, IsDefined } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class UpdateUserDTO {
    @IsString({message: i18nValidationMessage('validation.user.update.name.is-string')})
    readonly name: string

    @IsDefined({message: i18nValidationMessage('validation.user.update.surname.is-defined')})
    readonly surname: string | null

    @IsEmail({}, {message: i18nValidationMessage('validation.user.update.email.is-email')})
    readonly email: string

    @IsString({message: i18nValidationMessage('validation.user.update.login.is-string')})
    readonly login: string

    @IsDefined({message: i18nValidationMessage('validation.user.update.birthday.is-defined')})
    readonly birthday: string | null

    @IsString({message: i18nValidationMessage('validation.user.update.privacy.is-string')})
    readonly privacy: string
}