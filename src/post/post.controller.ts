import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UsePipes, UseInterceptors, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { TransformServerMessageInterceptor } from 'src/transform/transform-server-message.interceptor'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { PostCreateDTO } from './DTO/post-create.dto'
import { PostGetManyDTO } from './DTO/post-get-many.dto'
import { PostUpdateDTO } from './DTO/post-update.dto'
import { PostService } from './post.service'
import { Post as PostModel } from './post.model'
import { DocumentationHttpExceptionDTO } from 'src/documentation/documentation.http-exception.dto'

@ApiTags('Post')
@UseInterceptors(TransformServerMessageInterceptor)
@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }

    @ApiOperation({summary: 'Receiving a post'})
    @ApiResponse({status: HttpStatus.OK, type: PostModel})
    @ApiResponse({status: HttpStatus.NOT_FOUND, type: DocumentationHttpExceptionDTO})
    @Get('/:postId')
    getOne(@Param('postId') postId: string) {
        return this.postService.getOne(postId)
    }

    @ApiOperation({summary: 'Receiving a posts'})
    @ApiResponse({status: HttpStatus.OK, type: PostModel})
    @Get()
    @UsePipes(ValidationPipe)
    getMany(@Query() query: PostGetManyDTO) {
        return this.postService.getMany(query)
    }

    @ApiOperation({summary: 'Post creation'})
    @ApiResponse({status: HttpStatus.CREATED, type: PostModel})
    @Post()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    create(@Req() request: RequestUser, @Body() dto: PostCreateDTO) {
        return this.postService.create({...dto, userId: request.user.id})
    }

    @ApiOperation({summary: 'Post update'})
    @ApiResponse({status: HttpStatus.OK, type: PostModel})
    @Put()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    update(@Body() dto: PostUpdateDTO) {
        return this.postService.update(dto)
    }

    @ApiOperation({summary: 'Deleting a post'})
    @ApiResponse({status: HttpStatus.NO_CONTENT})
    @Delete('/:postId')
    @UseGuards(AuthorizationGuard)
    delete(@Req() request: RequestUser, @Param('postId') postId: string) {
        return this.postService.delete({userId: request.user.id, postId})
    }
}
