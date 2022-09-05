import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UsePipes } from '@nestjs/common'
import { AuthorizationGuard, RequestUser } from 'src/authorization/authorization.guard'
import { ValidationPipe } from 'src/validation/validation.pipe'
import { PostCreateDTO } from './DTO/post-create.dto'
import { PostGetManyDTO } from './DTO/post-get-many.dto'
import { PostUpdateDTO } from './DTO/post-update.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }

    @Get('/:postId')
    getOne(@Param('postId') postId: string) {
        return this.postService.getOne(postId)
    }

    @Get()
    @UsePipes(ValidationPipe)
    getMany(@Query() query: PostGetManyDTO) {
        return this.postService.getMany(query)
    }

    @Post()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    create(@Req() request: RequestUser, @Body() dto: PostCreateDTO) {
        return this.postService.create({...dto, userId: request.user.id})
    }

    @Put()
    @UseGuards(AuthorizationGuard)
    @UsePipes(ValidationPipe)
    update(@Body() dto: PostUpdateDTO) {
        return this.postService.update(dto)
    }

    @Delete('/:postId')
    @UseGuards(AuthorizationGuard)
    delete(@Req() request: RequestUser, @Param('postId') postId: string) {
        return this.postService.delete({userId: request.user.id, postId})
    }
}
