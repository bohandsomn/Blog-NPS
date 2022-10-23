import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDTO {
    @ApiProperty({example: 1})
    readonly id: number

    @ApiProperty({example: 'Bohdan'})
    readonly name: string

    @ApiProperty({example: null})
    readonly surname: string | null
    
    @ApiProperty({example: 'bohdan.lukianchenko@gmail.com'})
    readonly email: string

    @ApiProperty({example: 'bohdan'})
    readonly login: string

    @ApiProperty({example: true})
    readonly isActivation: boolean

    @ApiProperty({example: null})
    readonly birthday: string | null
}