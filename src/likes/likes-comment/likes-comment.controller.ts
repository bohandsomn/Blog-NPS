import { Controller, Param, Post, Req, UseGuards, UseInterceptors, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { LikesComment } from './likes-comment.model'
import { LikesCommentService } from './likes-comment.service'

@ApiTags('Comment\'s like')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('likes-comment/:commentId')
export class LikesCommentController {
    constructor(
        private readonly likesCommentService: LikesCommentService
    ) { }

    @ApiOperation({summary: 'Set like'})
    @ApiResponse({status: HttpStatus.OK, type: LikesComment})
    @Post('like')
    @UseGuards(AuthorizationGuard)
    like(@Req() request: RequestUser, @Param('commentId') commentId: string) {
        return this.likesCommentService.like({userId: request.user.id, commentId})
    }

    @ApiOperation({summary: 'Set dislike'})
    @ApiResponse({status: HttpStatus.OK, type: LikesComment})
    @Post('dislike')
    @UseGuards(AuthorizationGuard)
    dislike(@Req() request: RequestUser, @Param('commentId') commentId: string) {
        return this.likesCommentService.dislike({userId: request.user.id, commentId})
    }

    @ApiOperation({summary: 'Unlike'})
    @ApiResponse({status: HttpStatus.OK, type: LikesComment})
    @Post('unlike')
    @UseGuards(AuthorizationGuard)
    unlike(@Req() request: RequestUser, @Param('commentId') commentId: string) {
        return this.likesCommentService.unlike({userId: request.user.id, commentId})
    }
}
