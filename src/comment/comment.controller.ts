import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { CommentService } from './comment.service'
import { CommentCreateDTO } from './DTO/comment-create.dto'
import { CommentUpdateDTO } from './DTO/comment-update.dto'

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @Get('/:postId')
    getByPostId(@Param('postId') postId: string) {
        return this.commentService.getByPostId(postId)
    }

    @Post()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    create(
        @Req() request: RequestUser,
        @Body() dto: CommentCreateDTO
    ) {
        return this.commentService.create({...dto, userId: request.user.id})
    }

    @Put()
    @UsePipes(ValidationPipe)
    update(@Body() dto: CommentUpdateDTO) {
        return this.commentService.update(dto)
    }

    @Delete('/:commentId')
    delete(@Param('commentId') commentId: string) {
        return this.commentService.delete(commentId)
    }
}
