import { ApiProperty } from '@nestjs/swagger'
export class SubscribeSubscribeDTO {
    @ApiProperty({example: 1})
    readonly userId: number

    @ApiProperty({example: 1})
    readonly subscriberId: number
}