import { Size } from 'src/photo/transformation/photo-resize.pipe'

export class PhotoChatGetDTO {
    readonly size: Size
    readonly chatId: string
}