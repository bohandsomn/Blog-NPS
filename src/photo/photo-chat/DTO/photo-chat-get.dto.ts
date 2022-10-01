import { ApiProperty } from '@nestjs/swagger'

export class PhotoChatGetDTO {
    @ApiProperty({example: '1'})
    readonly chatId: string
}