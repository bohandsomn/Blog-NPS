import { ApiProperty } from '@nestjs/swagger'
export class PhotoUserUpdateDTO {
    @ApiProperty({example: 1})
    readonly userId: number

    @ApiProperty({example: 'relative/file/path'})
    readonly original: string

    @ApiProperty({example: 'relative/file/path'})
    readonly post: string

    @ApiProperty({example: 'relative/file/path'})
    readonly preview: string
    
    @ApiProperty({example: 'relative/file/path'})
    readonly message: string
}