import { ApiProperty } from '@nestjs/swagger'
export class LikesPostGetOneDTO {
    @ApiProperty({example: 1})
    readonly userId: number

    @ApiProperty({example: "1"})
    readonly postId: string
}