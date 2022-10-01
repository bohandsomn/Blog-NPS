import { Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors, HttpStatus } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { PhotoResizePipe } from '../transformation/photo-resize.pipe'
import { PhotoUser } from './photo-user.model'
import { PhotoUserService } from './photo-user.service'

@ApiTags('User\'s photo')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('photo/user')
export class PhotoUserController {
    constructor(
        private readonly photoUserService: PhotoUserService
    ) { }

    @ApiOperation({summary: 'Receiving a photo original'})
    @ApiResponse({status: HttpStatus.OK, type: Buffer})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Get('/original/:userId')
    async getOriginal(@Param('userId') userId: string, @Res() response: Response) {
        const stream = await this.photoUserService.getOriginal({userId, size: 'original'})
        return stream.pipe(response)
    }

    @ApiOperation({summary: 'Receiving a photo post'})
    @ApiResponse({status: HttpStatus.OK, type: Buffer})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Get('/post/:userId')
    async getPost(@Param('userId') userId: string, @Res() response: Response) {
        const stream = await this.photoUserService.getPost({userId, size: 'post'})
        return stream.pipe(response)
    }
    
    @ApiOperation({summary: 'Receiving a photo preview'})
    @ApiResponse({status: HttpStatus.OK, type: Buffer})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Get('/preview/:userId')
    async getPreview(@Param('userId') userId: string, @Res() response: Response) {
        const stream = await this.photoUserService.getPreview({userId, size: 'preview'})
        return stream.pipe(response)
    }
    
    @ApiOperation({summary: 'Receiving a photo message'})
    @ApiResponse({status: HttpStatus.OK, type: Buffer})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Get('/message/:userId')
    async getMessage(@Param('userId') userId: string, @Res() response: Response) {
        const stream = await this.photoUserService.getMessage({userId, size: 'message'})
        return stream.pipe(response)
    }

    @ApiOperation({summary: 'Photo creation'})
    @ApiResponse({status: HttpStatus.CREATED, type: PhotoUser})
    @ApiResponse({status: HttpStatus.CONFLICT, type: DocumentationHttpExceptionDTO})
    @Post()
    @UseGuards(AuthorizationGuard)
    @UseInterceptors(FileInterceptor('file'))
    create(
        @UploadedFile(new PhotoResizePipe(['original', 'post', 'preview', 'message'])) filePaths: Awaited<ReturnType<PhotoResizePipe['transform']>>,
        @Req() request: RequestUser
    ) {
        return this.photoUserService.create({...filePaths, userId: request.user.id})
    }

    @ApiOperation({summary: 'Photo update'})
    @ApiResponse({status: HttpStatus.OK, type: PhotoUser})
    @Put()
    @UseGuards(AuthorizationGuard)
    @UseInterceptors(FileInterceptor('file'))
    update(
        @UploadedFile(new PhotoResizePipe(['original', 'post', 'preview', 'message'])) filePaths: Awaited<ReturnType<PhotoResizePipe['transform']>>,
        @Req() request: RequestUser
    ) {
        return this.photoUserService.update({...filePaths, userId: request.user.id})
    }

    @ApiOperation({summary: 'Deleting a photo'})
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    @Delete()
    @UseGuards(AuthorizationGuard)
    delete(@Req() request: RequestUser) {
        return this.photoUserService.delete(request.user.id)
    }
}
