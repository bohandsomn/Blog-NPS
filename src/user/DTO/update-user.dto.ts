export class UpdateUserDTO {
    readonly name: string
    readonly surname: string
    readonly email: string
    readonly login: string
    readonly birthday: string | null
    readonly privacy: string
}