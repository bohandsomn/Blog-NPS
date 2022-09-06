import { ApiProperty } from '@nestjs/swagger'
export class SubscribeUnsubscribeDTO {
    @ApiProperty({example: 1})
    readonly userId: number
    
    @ApiProperty({example: 1})
    readonly subscriberId: number
}