import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, HttpStatus } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { PhotoResizePipe } from '../transformation/photo-resize.pipe'
import { PhotoChatCreateBodyDTO } from './DTO/photo-chat-create.dto'
import { PhotoChatUpdateBodyDTO } from './DTO/photo-chat-update.dto'
import { PhotoChat } from './photo-chat.model'
import { PhotoChatService } from './photo-chat.service'

@ApiTags('Chat\'s photo')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('photo/chat')
export class PhotoChatController {
    constructor(
        private readonly photoChatService: PhotoChatService
    ) { }

    @ApiOperation({summary: 'Receiving a photo preview'})
    @ApiResponse({status: HttpStatus.OK, type: Buffer})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Get('/:chatId')
    @UseGuards(AuthorizationGuard)
    async getPreview(@Param('chatId') chatId: string, @Res() response: Response) {
        const stream = await this.photoChatService.getPreview({chatId})
        return stream.pipe(response)
    }

    @ApiOperation({summary: 'Photo creation'})
    @ApiResponse({status: HttpStatus.CREATED, type: PhotoChat})
    @ApiResponse({status: HttpStatus.CONFLICT, type: DocumentationHttpExceptionDTO})
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

    @ApiOperation({summary: 'Photo update'})
    @ApiResponse({status: HttpStatus.OK, type: PhotoChat})
    @ApiResponse({status: HttpStatus.CONFLICT, type: DocumentationHttpExceptionDTO})
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

    @ApiOperation({summary: 'Deleting a photo'})
    @ApiResponse({status: HttpStatus.NO_CONTENT, type: PhotoChat})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Delete('/:chatId')
    @UseGuards(AuthorizationGuard)
    delete(@Param('chatId') chatId: string, @Req() request: RequestUser) {
        return this.photoChatService.delete({userId: request.user.id, chatId})
    }
}
