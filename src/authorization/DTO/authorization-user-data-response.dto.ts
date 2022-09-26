import { UserResponseDTO } from 'src/user/DTO/user-response.dto'

export class AuthorizationUserDataResponseDTO {
    readonly accessToken: string
    readonly user: UserResponseDTO
}