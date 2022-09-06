import { ApiProperty } from '@nestjs/swagger'
import { Size } from 'src/photo/transformation/photo-resize.pipe'

export class PhotoUserGetDTO {
    @ApiProperty({example: "original"})
    readonly size: Size
    
    @ApiProperty({example: "1"})
    readonly userId: string
}