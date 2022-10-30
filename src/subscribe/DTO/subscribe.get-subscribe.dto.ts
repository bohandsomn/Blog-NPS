import { ApiProperty } from '@nestjs/swagger'
export class SubscribeGetSubscribeDTO {
    @ApiProperty({example: 1})
    readonly userId: number
    
    @ApiProperty({example: 1})
    readonly subscriberId: number
}