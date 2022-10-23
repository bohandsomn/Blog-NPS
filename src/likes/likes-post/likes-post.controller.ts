import { Controller, Param, Post, Req, UseGuards, UseInterceptors, HttpStatus, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { LikesPost } from './likes-post.model'
import { LikesPostService } from './likes-post.service'

@ApiTags('Post\'s like')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('likes-post/:postId')
export class LikesPostController {
    constructor(
        private readonly likesPostService: LikesPostService
    ) { }

    @ApiOperation({summary: 'Getting like'})
    @ApiResponse({status: HttpStatus.OK, type: LikesPost})
    @Get('/:userId')
    async getOne(@Param('postId') postId: string, @Param('userId') userId: string) {
        const likePost = await this.likesPostService.getOne({postId, userId: parseInt(userId)})
        if (likePost === null) {
            return this.likesPostService.unlike({postId, userId: parseInt(userId)})
        }
        return likePost
    }

    @ApiOperation({summary: 'Set like'})
    @ApiResponse({status: HttpStatus.OK, type: LikesPost})
    @Post('like')
    @UseGuards(AuthorizationGuard)
    like(@Req() request: RequestUser, @Param('postId') postId: string) {
        return this.likesPostService.like({userId: request.user.id, postId})
    }

    @ApiOperation({summary: 'Set dislike'})
    @ApiResponse({status: HttpStatus.OK, type: LikesPost})
    @Post('dislike')
    @UseGuards(AuthorizationGuard)
    dislike(@Req() request: RequestUser, @Param('postId') postId: string) {
        return this.likesPostService.dislike({userId: request.user.id, postId})
    }

    @ApiOperation({summary: 'Unlike'})
    @ApiResponse({status: HttpStatus.OK, type: LikesPost})
    @Post('unlike')
    @UseGuards(AuthorizationGuard)
    unlike(@Req() request: RequestUser, @Param('postId') postId: string) {
        return this.likesPostService.unlike({userId: request.user.id, postId})
    }
}
