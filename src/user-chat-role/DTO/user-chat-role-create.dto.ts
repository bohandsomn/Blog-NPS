import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
export class UserChatRoleCreateDTO {
    @ApiProperty({example: "ADMIN"})
    @IsString({message: i18nValidationMessage('validation.user-chat-role.create.value.is-string')})
    readonly value: string
}