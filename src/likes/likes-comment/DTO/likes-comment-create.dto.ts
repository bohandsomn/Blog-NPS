import { ApiProperty } from '@nestjs/swagger'
export class LikesCommentCreateDTO {
    @ApiProperty({example: 1})
    readonly userId: number

    @ApiProperty({example: "1"})
    readonly commentId: string

    @ApiProperty({example: true})
    readonly value: boolean
}