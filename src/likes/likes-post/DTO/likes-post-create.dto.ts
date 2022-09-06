import { ApiProperty } from '@nestjs/swagger'
export class LikesPostCreateDTO {
    @ApiProperty({example: 1})
    readonly userId: number

    @ApiProperty({example: "1"})
    readonly postId: string


    @ApiProperty({example: true})
    readonly value: boolean
}