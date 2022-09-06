import { ApiProperty } from '@nestjs/swagger'
export class PhotoChatDeleteDTO {
    @ApiProperty({example: 1})
    readonly userId: number

    @ApiProperty({example: "1"})
    readonly chatId: string
}