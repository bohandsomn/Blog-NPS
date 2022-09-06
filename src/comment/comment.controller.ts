import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { Comment } from './comment.model'
import { CommentService } from './comment.service'
import { CommentCreateDTO } from './DTO/comment-create.dto'
import { CommentUpdateDTO } from './DTO/comment-update.dto'

@ApiTags('Chat')
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @ApiOperation({summary: 'Receiving a comments'})
    @ApiResponse({status: 200, type: [Comment]})
    @Get('/:postId')
    getByPostId(@Param('postId') postId: string) {
        return this.commentService.getByPostId(postId)
    }

    @ApiOperation({summary: 'Comment creation'})
    @ApiResponse({status: 200, type: Comment})
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
    @ApiResponse({status: 200, type: Comment})
    @Put()
    @UsePipes(ValidationPipe)
    update(@Body() dto: CommentUpdateDTO) {
        return this.commentService.update(dto)
    }

    @ApiOperation({summary: 'Deleting a comment'})
    @Delete('/:commentId')
    delete(@Param('commentId') commentId: string) {
        return this.commentService.delete(commentId)
    }
}
