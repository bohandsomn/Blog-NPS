import { ApiProperty } from '@nestjs/swagger'
export class CreateTokenDTO {
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

    @ApiProperty({example: '2003-05-26'})
    readonly birthday: string | null
    
    @ApiProperty({example: 1})
    readonly privacyId: number

    @ApiProperty({example: false})
    readonly isActivation: boolean
}