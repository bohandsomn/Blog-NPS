import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { PhotoResizePipe } from '../transformation/photo-resize.pipe'
import { PhotoChatCreateBodyDTO } from './DTO/photo-chat-create.dto'
import { PhotoChatUpdateBodyDTO } from './DTO/photo-chat-update.dto'
import { PhotoChatService } from './photo-chat.service'

@Controller('photo/chat')
export class PhotoChatController {
    constructor(
        private readonly photoChatService: PhotoChatService
    ) { }

    @Get('/:chatId')
    @UseGuards(AuthorizationGuard)
    async getPreview(@Param('chatId') chatId: string, @Res() response: Response) {
        const stream = await this.photoChatService.getPreview({chatId, size: 'preview'})
        return stream.pipe(response)
    }

    @Post()
    @UseGuards(AuthorizationGuard)
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(ValidationPipe)
    create(
        @UploadedFile(new PhotoResizePipe(['preview'])) filePaths: Awaited<ReturnType<PhotoResizePipe['transform']>>,
        @Body() dto: PhotoChatCreateBodyDTO
    ) {
        return this.photoChatService.create({...dto, ...filePaths})
    }

    @Put()
    @UseGuards(AuthorizationGuard)
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(ValidationPipe)
    update(
        @UploadedFile(new PhotoResizePipe(['original', 'post', 'preview', 'message'])) filePaths: Awaited<ReturnType<PhotoResizePipe['transform']>>,
        @Body() dto: PhotoChatUpdateBodyDTO
    ) {
        return this.photoChatService.update({...dto, ...filePaths})
    }

    @Delete('/:chatId')
    @UseGuards(AuthorizationGuard)
    delete(@Param('chatId') chatId: string, @Req() request: RequestUser) {
        return this.photoChatService.delete({userId: request.user.id, chatId})
    }
}
