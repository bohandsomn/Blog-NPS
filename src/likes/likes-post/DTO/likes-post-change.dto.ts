import { ApiProperty } from '@nestjs/swagger'
export class LikesPostChangeDTO {
    @ApiProperty({example: 1})
    readonly userId: number
    
    @ApiProperty({example: "1"})
    readonly postId: string
}