import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsDefined } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class UpdateUserDTO {
    @ApiProperty({example: 'Bohdan'})
    @IsString({message: i18nValidationMessage('validation.user.update.name.is-string')})
    readonly name: string

    @ApiProperty({example: null})
    @IsDefined({message: i18nValidationMessage('validation.user.update.surname.is-defined')})
    readonly surname: string | null

    @ApiProperty({example: 'bohdan.lukianchenko@gmail.com'})
    @IsEmail({}, {message: i18nValidationMessage('validation.user.update.email.is-email')})
    readonly email: string

    @ApiProperty({example: 'bohdan'})
    @IsString({message: i18nValidationMessage('validation.user.update.login.is-string')})
    readonly login: string

    @ApiProperty({example: '2003-05-26'})
    @IsDefined({message: i18nValidationMessage('validation.user.update.birthday.is-defined')})
    readonly birthday: string | null

    @ApiProperty({example: "PRIVATE"})
    @IsString({message: i18nValidationMessage('validation.user.update.privacy.is-string')})
    readonly privacy: string
}