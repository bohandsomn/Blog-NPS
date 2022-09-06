import { ApiProperty } from '@nestjs/swagger'
export class CreateUserDTO {
    @ApiProperty({example: 'Bohdan'})
    readonly name: string

    @ApiProperty({example: 'bohdan.lukianchenko@gmail.com'})
    readonly email: string

    @ApiProperty({example: 'bohdan'})
    readonly login: string
    
    @ApiProperty({example: '12345678'})
    readonly password: string
}