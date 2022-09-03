import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { LikesPostService } from './likes-post.service'

@Controller('likes-post/:postId')
export class LikesPostController {
    constructor(
        private readonly likesPostService: LikesPostService
    ) { }

    @Post('like')
    @UseGuards(AuthorizationGuard)
    like(@Req() request: RequestUser, @Param('postId') postId: string) {
        return this.likesPostService.like({userId: request.user.id, postId})
    }

    @Post('dislike')
    @UseGuards(AuthorizationGuard)
    dislike(@Req() request: RequestUser, @Param('postId') postId: string) {
        return this.likesPostService.dislike({userId: request.user.id, postId})
    }

    @Post('unlike')
    @UseGuards(AuthorizationGuard)
    unlike(@Req() request: RequestUser, @Param('postId') postId: string) {
        return this.likesPostService.unlike({userId: request.user.id, postId})
    }
}
