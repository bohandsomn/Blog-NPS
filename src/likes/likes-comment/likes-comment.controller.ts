import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { LikesCommentService } from './likes-comment.service'

@Controller('likes-comment/:commentId')
export class LikesCommentController {
    constructor(
        private readonly likesCommentService: LikesCommentService
    ) { }

    @Post('like')
    @UseGuards(AuthorizationGuard)
    like(@Req() request: RequestUser, @Param('commentId') commentId: string) {
        return this.likesCommentService.like({userId: request.user.id, commentId})
    }

    @Post('dislike')
    @UseGuards(AuthorizationGuard)
    dislike(@Req() request: RequestUser, @Param('commentId') commentId: string) {
        return this.likesCommentService.dislike({userId: request.user.id, commentId})
    }

    @Post('unlike')
    @UseGuards(AuthorizationGuard)
    unlike(@Req() request: RequestUser, @Param('commentId') commentId: string) {
        return this.likesCommentService.unlike({userId: request.user.id, commentId})
    }
}
