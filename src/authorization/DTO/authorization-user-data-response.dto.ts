import { ApiProperty } from '@nestjs/swagger'
import { UserResponseDTO } from 'src/user/DTO/user-response.dto'

export class AuthorizationUserDataResponseDTO {
    @ApiProperty({ example: 'token' })
    readonly accessToken: string

    @ApiProperty({type: UserResponseDTO})
    readonly user: UserResponseDTO
}