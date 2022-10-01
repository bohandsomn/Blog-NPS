import { ApiProperty } from '@nestjs/swagger'

export class DocumentationHttpExceptionDTO {
    @ApiProperty({ type: 'string' })
    readonly message: string
}