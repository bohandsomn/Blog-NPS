export class CreateTokenDTO {
    readonly id: number
    readonly name: string
    readonly surname: string | null
    readonly email: string
    readonly login: string
    readonly birthday: string | null
    readonly privacyId: number
    readonly isActivation: boolean
}