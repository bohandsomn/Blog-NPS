import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors, UsePipes, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { Comment } from './comment.model'
import { CommentService } from './comment.service'
import { CommentCreateDTO } from './DTO/comment-create.dto'
import { CommentUpdateDTO } from './DTO/comment-update.dto'

@ApiTags('Comment')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @ApiOperation({summary: 'Receiving a comments'})
    @ApiResponse({status: HttpStatus.OK, type: [Comment]})
    @Get('/:postId')
    getByPostId(@Param('postId') postId: string) {
        return this.commentService.getByPostId(postId)
    }

    @ApiOperation({summary: 'Comment creation'})
    @ApiResponse({status: HttpStatus.OK, type: Comment})
    @Post()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    create(
        @Req() request: RequestUser,
        @Body() dto: CommentCreateDTO
    ) {
        return this.commentService.create({...dto, userId: request.user.id})
    }

    @ApiOperation({summary: 'Comment update'})
    @ApiResponse({status: HttpStatus.OK, type: Comment})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Put()
    @UsePipes(ValidationPipe)
    update(@Body() dto: CommentUpdateDTO) {
        return this.commentService.update(dto)
    }

    @ApiOperation({summary: 'Deleting a comment'})
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    @Delete('/:commentId')
    delete(@Param('commentId') commentId: string) {
        return this.commentService.delete(commentId)
    }
}
