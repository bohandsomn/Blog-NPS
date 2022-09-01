import { Size } from 'src/photo/transformation/photo-resize.pipe'

export class PhotoUserGetDTO {
    readonly size: Size
    readonly userId: string
}