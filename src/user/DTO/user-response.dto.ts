export class UserResponseDTO {
    readonly id: number
    readonly name: string
    readonly surname: string | null
    readonly email: string
    readonly login: string
    readonly isActivation: boolean
    readonly birthday: string
}