import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, Length, IsLowercase } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class RegistrationAuthorizationDTO {
    @ApiProperty({example: 'Bohdan'})
    @IsString({message: i18nValidationMessage('validation.authorization.registration.name.is-string')})
    readonly name: string

    @ApiProperty({example: 'bohdan.lukianchenko@gmail.com'})
    @IsEmail({}, {message: i18nValidationMessage('validation.authorization.registration.email.is-email')})
    readonly email: string

    @ApiProperty({example: 'bohdan'})
    @IsString({message: i18nValidationMessage('validation.authorization.registration.login.is-string')})
    @IsLowercase({message: i18nValidationMessage('validation.authorization.registration.login.is-lowercase')})
    readonly login: string

    @ApiProperty({example: '12345678'})
    @IsString({message: i18nValidationMessage('validation.authorization.registration.password.is-string')})
    @Length(4, 10, {message: i18nValidationMessage('validation.authorization.registration.password.lenght')})
    readonly password: string
}