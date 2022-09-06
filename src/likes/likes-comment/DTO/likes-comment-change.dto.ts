import { ApiProperty } from '@nestjs/swagger'

export class LikesCommentChangeDTO {
    @ApiProperty({example: 1})
    readonly userId: number

    @ApiProperty({example: "1"})
    readonly commentId: string
}