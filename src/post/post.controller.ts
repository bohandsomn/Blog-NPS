import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UsePipes, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { TransformInterceptor } from 'src/transform/transform.interceptor'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { PostCreateDTO } from './DTO/post-create.dto'
import { PostGetManyDTO } from './DTO/post-get-many.dto'
import { PostUpdateDTO } from './DTO/post-update.dto'
import { PostService } from './post.service'

@ApiTags('Post')
@UseInterceptors(TransformInterceptor)
@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }

    @ApiOperation({summary: 'Receiving a post'})
    @Get('/:postId')
    getOne(@Param('postId') postId: string) {
        return this.postService.getOne(postId)
    }

    @ApiOperation({summary: 'Receiving a posts'})
    @Get()
    @UsePipes(ValidationPipe)
    getMany(@Query() query: PostGetManyDTO) {
        return this.postService.getMany(query)
    }

    @ApiOperation({summary: 'Post creation'})
    @Post()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    create(@Req() request: RequestUser, @Body() dto: PostCreateDTO) {
        return this.postService.create({...dto, userId: request.user.id})
    }

    @ApiOperation({summary: 'Post update'})
    @Put()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    update(@Body() dto: PostUpdateDTO) {
        return this.postService.update(dto)
    }

    @ApiOperation({summary: 'Deleting a post'})
    @Delete('/:postId')
    @UseGuards(AuthorizationGuard)
    delete(@Req() request: RequestUser, @Param('postId') postId: string) {
        return this.postService.delete({userId: request.user.id, postId})
    }
}
